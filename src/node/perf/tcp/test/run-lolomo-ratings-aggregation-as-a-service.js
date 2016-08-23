'use strict';

const restify = require('restify');

const buildClient = require('./buildClient');
const programArgs = require('../../../programArgs');
const FramingStream = require('../FramingStream');
const AsAService = require('../AsAService');
const Netflix = require('../../../data/lolomo_generated').Netflix;
const RatingsRequest = require('../../../data/ratings-request_generated').Netflix.RatingsRequest;
const RatingsResponse = require('../../../data/ratings-response_generated').Netflix.RatingsResponse;
const LolomoGenerator = require('../../../data/LolomoGenerator');
const flatbuffers = require('../../../flatbuffers').flatbuffers;

const Lolomo = Netflix.Lolomo;

function initialize() {
    let lolomoClient = null;
    let ratingsClient = null;

    const lHost = programArgs.lolomoHost;
    const lPort = programArgs.lolomoPort;
    const rHost = programArgs.ratingsHost;
    const rPort = programArgs.ratingsPort;

    buildClient(lHost, lPort, function _lolomoClient(err, lClient) {
        if (err) {
            throw err;
        }

        lolomoClient = new FramingStream(lClient);
        runWhenReady(lolomoClient, ratingsClient);
    });

    buildClient(rHost, rPort, function _ratingsClient(err, rClient) {
        if (err) {
            throw err;
        }

        ratingsClient = new FramingStream(rClient);
        runWhenReady(lolomoClient, ratingsClient);
    });
}

function runWhenReady(lolomoClient, ratingsClient) {
    if (!lolomoClient || !ratingsClient) {
        return;
    }

    const server = restify.createServer();
    const args = {
        port: programArgs.port,
        host: programArgs.host
    };
    const requestMap = {};
    let fbsCount = 0;
    let jsonCount = 0;
    let fbsVideoCount = 0;
    let jsonVideoCount = 0;
    const intervalId = setInterval(function _reportRPS() {
        console.log('RPS(fbs): ', fbsCount / 10);
        console.log('RPS(json): ', jsonCount / 10);
        console.log('RPS(videos.fbs): ', fbsVideoCount / 10);
        console.log('RPS(videos.json): ', jsonVideoCount / 10);
        
        fbsCount = jsonCount = fbsVideoCount = jsonVideoCount = 0;
    }, 10000);

    lolomoClient.on('data', function _lolomoResponse(lolomoBuf) {
        const lolomo = AsAService.parse(lolomoBuf, Lolomo.getRootAsLolomo);
        const isJSON = AsAService.isJSONRequest(lolomoBuf);
        const clientId = getClientId(lolomo, isJSON);
        const request = requestMap[clientId];
        
        if (!request) {
            console.log('Lolomo, we have a problem');
            console.log(lolomoBuf.toString());
        }
        
        const ids = getIds(lolomo, isJSON, request.isGraph);
        
        request.lolomo = lolomo;
        request.ids = ids;
        
        const ratingRequest = buildRatingsRequest(ids, clientId, isJSON);
        ratingsClient.write(ratingRequest);
    });
    
    lolomoClient.on('error', function _lolomoError(e) {
        console.log('lolomo');
        console.log(e.message);
        console.log(e.stack);
        process.abort(1);
    });
    
    ratingsClient.on('data', function _ratingsResponse(ratingsBuf) {
        const ratingsResponse = AsAService.parse(ratingsBuf, RatingsResponse.getRootAsRatingsResponse);
        const isJSON = AsAService.isJSONRequest(ratingsBuf);
        const clientId = getClientId(ratingsResponse, isJSON);
        const request = requestMap[clientId];

        if (!request) {
            console.log('ratings, we have a problem');
            console.log(ratingsBuf.toString());
        }

        mergeData(request.lolomo, request.ids, ratingsResponse, isJSON);
        if (!isJSON) {
            request.res.contentType = 'application/octet-stream';
        }
        request.res.send(request.lolomo);

        requestMap[clientId] = undefined;

        // Really I know that this is _perfect_ counting considering that request.res.send has
        // yet to technically send out its data.
        if (isJSON) {
            jsonCount++;
            jsonVideoCount += request.rows * request.columns;
        }
        
        else {
            fbsCount++;
            fbsVideoCount += request.rows * request.columns;

        }
    });
    
    ratingsClient.on('error', function _ratingsError(e) {
        console.log('ratings');
        console.log(e.message);
        console.log(e.stack);
        process.abort(1);
    });

    server.get('/lolomo/:clientId/:rows/:columns/:sim/:isGraph/:isJSON', function _getLolomo(req, res, next) {
        const clientId = +req.params.clientId;
        const isJSON = req.params.isJSON === 'true';
        const isGraph = req.params.isGraph === 'true';
        const percentSim = +req.params.sim;
        const columns = +req.params.columns;
        const rows = +req.params.rows;

        requestMap[clientId] = {
            req: req, 
            res: res, 
            next: next,
            isGraph: isGraph,
            rows: rows,
            columns: columns,
            lolomo: null
        };
        
        const lolomoResponse = getLolomoRequest(rows, columns, percentSim, 
            isGraph, clientId, isJSON);
        lolomoClient.write(lolomoResponse);
    });

    server.listen(args, function _onListen() {
        console.log('%s listening at %s', server.name, server.url);
    });
}

function getLolomoRequest(rows, columns, percentSimilar, 
                          isGraph, clientId, isJSON) {

    const request = LolomoGenerator.createRequest(
        clientId, rows, columns, percentSimilar, isGraph, isJSON);

    const buffer = isJSON ? new Buffer(JSON.stringify(request)) :
        new Buffer(request);

    return AsAService.createTransportBuffer(buffer, isJSON);
}

function getClientId(obj, isJSON) {
    return isJSON ? obj.clientId : obj.clientId();
}

function getIds(lolomo, isJSON, isGraph) {
    
    const videoMap = {};
    const rowLength = isJSON ? lolomo.rows.length : lolomo.rowsLength();
    for (let rIdx = 0; rIdx < rowLength; ++rIdx) {
        const row = isJSON ? lolomo.rows[rIdx] : lolomo.rows(rIdx);
        
        const videosLength = isJSON ? row.videos.length : row.videosLength();
        for (let vIdx = 0; vIdx < videosLength; ++vIdx) {
            const video = isJSON ? row.videos[vIdx] : row.videos(vIdx);
            const id = isJSON ? video.id : video.id();

            if (!videoMap[id]) {
                videoMap[id] = true;
            }
        }
    }
    
    return Object.keys(videoMap);
}

function buildRatingsRequest(ids, clientId, isJSON) {
    let request = null;
    if (isJSON) {
        request = JSON.stringify({
            videos: ids,
            clientId: clientId
        });
    }

    else {
        const bb = new flatbuffers.Builder(ids.length);
        const vOffset = RatingsRequest.createVideosVector(bb, ids);

        RatingsRequest.startRatingsRequest(bb);
        RatingsRequest.addVideos(bb, vOffset);
        RatingsRequest.addClientId(bb, clientId);

        const rOffset = RatingsRequest.endRatingsRequest(bb);
        RatingsRequest.finishRatingsRequestBuffer(bb, rOffset);

        request = bb.asUint8Array();
    }
    const buffer = new Buffer(request);
    return AsAService.createTransportBuffer(buffer, isJSON);
}

function mergeData(lolomo, ids, res, isJSON) {

    const videoMap = {};
    for (let idIdx = 0; idIdx < ids.length; ++idIdx) {
        const id = ids[idIdx];
        const rating = isJSON ? res.ratings[idIdx] : res.ratings(idIdx);
        
        videoMap[id] = rating;
    }
    
    const rowLength = isJSON ? lolomo.rows.length : lolomo.rowsLength();
    for (let rIdx = 0; rIdx < rowLength; ++rIdx) {
        const row = isJSON ? lolomo.rows[rIdx] : lolomo.rows(rIdx);

        const videosLength = isJSON ? row.videos.length : row.videosLength();
        for (let vIdx = 0; vIdx < videosLength; ++vIdx) {
            const video = isJSON ? row.videos[vIdx] : row.videos(vIdx);
            const id = isJSON ? video.id : video.id();

            if (isJSON) {
                video.starRating = videoMap[id];
            }
            else {
                video.mutate_starRating(videoMap[id]);
            }
        }
    }
}

if (require.main === module) {
    initialize();
}
'use strict';

const assert = require('assert');

const DataGenerator = require('./DataGenerator');
const randomListItem = require('./random').randomListItem;
const fbs = require('./fbs');
const json = require('./json');
const LolomoRequest = require('./lolomo-request_generated').Netflix.LolomoRequest;
const flatbuffers = require('../flatbuffers').flatbuffers;
const Lolomo = require('./lolomo_generated').Netflix.Lolomo;

const startID = 8000000;
const ROW_TITLE_LEN = 10;
const VIDEO_TITLE_LEN = 10;
const VIDEO_SYNOPSIS_LEN = 160;
const maturityList = [
    "Y",
    "PG",
    "PG_13",
    "TV_14",
    "TV_17",
    "R",
    "NR"
];

const LolomoGenerator = function LolomoGenerator() {
    this._cache = [];
    this._generator = new DataGenerator();
    this._id = startID;
    this._createVideo();
};

module.exports = LolomoGenerator;

LolomoGenerator.prototype = {
    createLolomo(r, c, percentSimilar, clientId) {
        percentSimilar = percentSimilar || 0;

        const count = r * c;
        const id = this._generateId();
        const rows = [];
        for (let i = 0; i < r; ++i) {
            rows.push(this._createRow(c, percentSimilar));
        }

        return {
            rows: rows,
            id: id,
            clientId: clientId
        };
    },

    getLolomoAsFBS(r, c, percentSimilar, unique, clientId) {
        const lolomo = this.createLolomo(r, c, percentSimilar, clientId);
        return fbs(lolomo, unique);
    },

    getLolomoAsJSON(r, c, percentSimilar, unique, clientId) {
        const lolomo = this.createLolomo(r, c, percentSimilar, clientId);
        return json(lolomo, unique);
    },

    reset() {
        this._cache = [];
        this._generator.reset();
        this._createVideo();
    },


    _getId() {
        return ++this._id;
    },

    _generateId(len) {
        len = len || 16;
        let str = '';
        for (let i = 0; i < len; ++i) {
            str += String.fromCharCode(40 + Math.floor(Math.random() * 52));
        }
        return str;
    },

    _getRowTitle() {
        return this._generator.getRandomString(ROW_TITLE_LEN);
    },

    _getVideoTitle() {
        return this._generator.getRandomString(VIDEO_TITLE_LEN);
    },

    _getVideoSynopsis() {
        return this._generator.getRandomString(VIDEO_SYNOPSIS_LEN);
    },

    _getRandomBoolean(chance) {
        return Math.random() > chance;
    },

    _getRandomCachedVideo() {
        return randomListItem(this._cache);
    },

    _createVideo() {
        const video = {
            id: this._getId(),
            title: this._getVideoTitle(),
            synopsis: this._getVideoSynopsis(),
            altSynopsis: this._getVideoSynopsis(),
            isOriginal: this._getRandomBoolean(.1),
            isSeason: this._getRandomBoolean(.7),
            isMovie: this._getRandomBoolean(.3),
            runningTime: 1,
            maturityRating: randomListItem(maturityList),
            starRating: 1,
            yearCreated: this._generator.getRandomInt(2016, 1896),
            badging: {
                HD: this._getRandomBoolean(.9),
                UHD: this._getRandomBoolean(.2),
                Dolby5_1: this._getRandomBoolean(.9),
                Dolby7_1: this._getRandomBoolean(.3),
                HDR: this._getRandomBoolean(.01)
            }
        };

        // caches the video right away.
        this._cache.push(video);

        return video;
    },

    _createRow(columns, percentSimilar) {
        const similarCount = Math.floor(percentSimilar * columns);
        const startOfSimilars = columns - similarCount;
        const title = this._getRowTitle();
        const videos = [];

        for (let i = 0; i < columns; ++i) {
            if (i >= startOfSimilars) {
                videos.push(this._getRandomCachedVideo());
            } else {
                videos.push(this._createVideo());
            }
        }

        return {
            title: title,
            id: this._generateId(),
            videos: videos
        };
    }
};

LolomoGenerator.createRequest = function _request(clientId, rows,
                                                  columns, percentSimilar,
                                                  isGraph, isJSON) {

    if (isJSON) {
        return {
            rows: rows,
            columns: columns,
            percentSimilar: percentSimilar,
            isGraph: isGraph,
            clientId: clientId
        };
    }
    
    const bb = new flatbuffers.Builder(20);
    LolomoRequest.startLolomoRequest(bb);
    LolomoRequest.addClientId(bb, clientId);
    LolomoRequest.addRows(bb, rows);
    LolomoRequest.addColumns(bb, columns);
    LolomoRequest.addPercentSimilar(bb, percentSimilar);
    LolomoRequest.addIsGraph(bb, isGraph);

    const idx = LolomoRequest.endLolomoRequest(bb);
    LolomoRequest.finishLolomoRequestBuffer(bb, idx);

    return bb.asUint8Array();
};


/**
 * Attempts to print out the lolomo FBS.
 */
LolomoGenerator.printFBS = function printFBS(lolomo) {
    const rLen = lolomo.rowsLength();
    const space = '   ';
    const videoMap = {};
    let countedValue = 0;

    console.log('Lolomo {');

    for (let i = 0; i < rLen; ++i) {
        console.log(space, 'Row {')

        const row = lolomo.rows(i);
        const vLen = row.videosLength();
        console.log(space, space, 'title', row.title());

        for (let j = 0; j < vLen; ++j) {
            console.log(space, space, 'Video {');

            const video = row.videos(j);
            console.log(space, space, space, 'id', video.id());
            console.log(space, space, space, 'title', video.title());
            console.log(space, space, space, 'runningTime', video.runningTime());
            console.log(space, space, space, 'starRating', video.starRating());

            if (videoMap[video.id()]) {
                console.log('Match!', videoMap[video.id()], video.runningTime());
            }

            else {
                videoMap[video.id()] = video.runningTime();
            }

            console.log(space, space, '}')
        }
        console.log(space, '}')
    }
    console.log('}');

    console.log('Total Count: ', Object.keys(videoMap).reduce(function _(x, y) { return x + videoMap[y]; }, 0));
};

LolomoGenerator.printLolomoRequest = function printLolomoRequest(reqOrInt8) {
    let request = reqOrInt8;
    if (request instanceof Uint8Array) {
        request = LolomoRequest.getRootAsLolomoRequest(new flatbuffers.ByteBuffer(request));
    }
    
    console.log('rows', request.rows());
    console.log('columns', request.columns());
    console.log('isGraph', request.isGraph());
};

'use strict';

// This is the server piece to accept new, incoming
// TCP packets.
const net = require('net');

const FramingStream = require('./../FramingStream');
const jsonResponder = require('./respond-json');
const fbsResponder = require('./respond-fbs');
const limiter = require('./../limiter');
const client = require('./client');
const server = require('./server');
const booleanFromProcess = require('../../../booleanFromProcess');
const programArgs = require('../../../programArgs');

function createServer(host, port, responder, onServer) {
    const server = net.
        createServer(function _onServerConnection(socket) {

            const framer = new FramingStream(socket);
            framer.
                on('data', function _onClientData(chunk) {
                    responder(framer, chunk);
                });
        }).
        on('error', function _onServerError(e) {
            console.log('error', e);
        }).
        on('complete', function _onCompleted() {
            console.log('TCP Server connection completed');
        });


    // TODO: HOST?
    server.listen(port, function _serverStart(e) {
        console.log('server start', e);
        if (onServer) {
            onServer(e);
        }
    });
};

module.exports = createServer;

// If this is a file that is ran, then open the client.
if (require.main === module) {
    const responder = programArgs.isJSON ?
        jsonResponder.responder : fbsResponder.responder;
    createServer(programArgs.host, programArgs.port, responder);
}

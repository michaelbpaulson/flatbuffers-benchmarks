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

const PORT = process.env.PORT || 33000;
const HOST = process.env.HOST || 'localhost';
const IS_JSON = booleanFromProcess(process.env.IS_JSON, true);
const MAX_COUNT = process.env.MAX_COUNT || 1000;

module.exports = function createServer(host, port, responder) {
    const server = net.
        createServer(function _onServerConnection(socket) {

            const framer = new FramingStream(socket);
            framer.
                on('data', function _onClientData(chunk) {
                    responder.fn(framer, chunk);
                });
        }).
        on('error', function _onServerError(e) {
            console.log('error', e);
        });


    // TODO: HOST?
    server.listen(port, function _serverStart() {
        console.log('server started');
    });
};

// If this is a file that is ran, then open the client.
if (require.main === module) {
    let responder = IS_JSON ? jsonResponder.fn : fbsResponder.fn;
    let reporter = IS_JSON ? jsonResponder.report : fbsResponder.report;

    createServer(HOST, PORT, {fn: responder, report: reporter});
}

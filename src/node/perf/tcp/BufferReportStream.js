'use strict';

const Transform = require('stream').Transform;
const inherits = require('util').inherits;

const objectMode = {objectMode: true};

const BufferReportStream = function _BufferReportStream(name) {
    Transform.call(this, objectMode);
    this._name = name || '';
};

module.exports = BufferReportStream;

inherits(BufferReportStream, Transform);

BufferReportStream.prototype._transform = function _transform(chunk, enc, cb) {
    console.log(this._name, '#_transform', chunk);
    this.push(chunk);
    cb();
};

BufferReportStream.prototype._flush = function _flush() { };


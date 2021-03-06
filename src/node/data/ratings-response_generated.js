// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @const
 * @namespace
 */
var Netflix = Netflix || {};

/**
 * @constructor
 */
Netflix.RatingsResponse = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {Netflix.RatingsResponse}
 */
Netflix.RatingsResponse.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Netflix.RatingsResponse=} obj
 * @returns {Netflix.RatingsResponse}
 */
Netflix.RatingsResponse.getRootAsRatingsResponse = function(bb, obj) {
  return (obj || new Netflix.RatingsResponse).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {number} index
 * @returns {number}
 */
Netflix.RatingsResponse.prototype.ratings = function(index) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Netflix.RatingsResponse.prototype.ratingsLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Netflix.RatingsResponse.prototype.ratingsArray = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Netflix.RatingsResponse.prototype.clientId = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Netflix.RatingsResponse.startRatingsResponse = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} ratingsOffset
 */
Netflix.RatingsResponse.addRatings = function(builder, ratingsOffset) {
  builder.addFieldOffset(0, ratingsOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Netflix.RatingsResponse.createRatingsVector = function(builder, data) {
  builder.startVector(1, data.length, 1);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Netflix.RatingsResponse.startRatingsVector = function(builder, numElems) {
  builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} clientId
 */
Netflix.RatingsResponse.addClientId = function(builder, clientId) {
  builder.addFieldInt32(1, clientId, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Netflix.RatingsResponse.endRatingsResponse = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
Netflix.RatingsResponse.finishRatingsResponseBuffer = function(builder, offset) {
  builder.finish(offset);
};

// Exports for Node.js and RequireJS
this.Netflix = Netflix;

// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @const
 * @namespace
 */
var Netflix = Netflix || {};

/**
 * @enum
 */
Netflix.Badging = {
  HD: 1,
  UHD: 2,
  Dolby5_1: 4,
  Dolby7_1: 8,
  HDR: 16
};

/**
 * @enum
 */
Netflix.MaturityRating = {
  Y: 1,
  PG: 2,
  PG_13: 4,
  TV_14: 8,
  TV_17: 16,
  R: 32,
  NR: 64
};

/**
 * @constructor
 */
Netflix.Video = function() {
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
 * @returns {Netflix.Video}
 */
Netflix.Video.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Netflix.Video=} obj
 * @returns {Netflix.Video}
 */
Netflix.Video.getRootAsVideo = function(bb, obj) {
  return (obj || new Netflix.Video).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
Netflix.Video.prototype.id = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
Netflix.Video.prototype.title = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
Netflix.Video.prototype.synopsis = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
Netflix.Video.prototype.altSynopsis = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns {boolean}
 */
Netflix.Video.prototype.isOriginal = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns {boolean}
 */
Netflix.Video.prototype.isSeason = function() {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns {boolean}
 */
Netflix.Video.prototype.isMovie = function() {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns {number}
 */
Netflix.Video.prototype.runningTime = function() {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
};

/**
 * @returns {Netflix.MaturityRating}
 */
Netflix.Video.prototype.maturityRating = function() {
  var offset = this.bb.__offset(this.bb_pos, 20);
  return offset ? /** @type {Netflix.MaturityRating} */ (this.bb.readInt16(this.bb_pos + offset)) : 0;
};

/**
 * @returns {number}
 */
Netflix.Video.prototype.starRating = function() {
  var offset = this.bb.__offset(this.bb_pos, 22);
  return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
Netflix.Video.prototype.yearCreated = function() {
  var offset = this.bb.__offset(this.bb_pos, 24);
  return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
};

/**
 * @returns {Netflix.Badging}
 */
Netflix.Video.prototype.badging = function() {
  var offset = this.bb.__offset(this.bb_pos, 26);
  return offset ? /** @type {Netflix.Badging} */ (this.bb.readInt8(this.bb_pos + offset)) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Netflix.Video.startVideo = function(builder) {
  builder.startObject(12);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} id
 */
Netflix.Video.addId = function(builder, id) {
  builder.addFieldInt32(0, id, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} titleOffset
 */
Netflix.Video.addTitle = function(builder, titleOffset) {
  builder.addFieldOffset(1, titleOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} synopsisOffset
 */
Netflix.Video.addSynopsis = function(builder, synopsisOffset) {
  builder.addFieldOffset(2, synopsisOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} altSynopsisOffset
 */
Netflix.Video.addAltSynopsis = function(builder, altSynopsisOffset) {
  builder.addFieldOffset(3, altSynopsisOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {boolean} isOriginal
 */
Netflix.Video.addIsOriginal = function(builder, isOriginal) {
  builder.addFieldInt8(4, +isOriginal, +false);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {boolean} isSeason
 */
Netflix.Video.addIsSeason = function(builder, isSeason) {
  builder.addFieldInt8(5, +isSeason, +false);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {boolean} isMovie
 */
Netflix.Video.addIsMovie = function(builder, isMovie) {
  builder.addFieldInt8(6, +isMovie, +false);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} runningTime
 */
Netflix.Video.addRunningTime = function(builder, runningTime) {
  builder.addFieldInt16(7, runningTime, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Netflix.MaturityRating} maturityRating
 */
Netflix.Video.addMaturityRating = function(builder, maturityRating) {
  builder.addFieldInt16(8, maturityRating, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} starRating
 */
Netflix.Video.addStarRating = function(builder, starRating) {
  builder.addFieldInt8(9, starRating, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} yearCreated
 */
Netflix.Video.addYearCreated = function(builder, yearCreated) {
  builder.addFieldInt16(10, yearCreated, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Netflix.Badging} badging
 */
Netflix.Video.addBadging = function(builder, badging) {
  builder.addFieldInt8(11, badging, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Netflix.Video.endVideo = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
Netflix.Row = function() {
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
 * @returns {Netflix.Row}
 */
Netflix.Row.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Netflix.Row=} obj
 * @returns {Netflix.Row}
 */
Netflix.Row.getRootAsRow = function(bb, obj) {
  return (obj || new Netflix.Row).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
Netflix.Row.prototype.title = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {number} index
 * @param {Netflix.Video=} obj
 * @returns {Netflix.Video}
 */
Netflix.Row.prototype.videos = function(index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? (obj || new Netflix.Video).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
Netflix.Row.prototype.videosLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Netflix.Row.startRow = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} titleOffset
 */
Netflix.Row.addTitle = function(builder, titleOffset) {
  builder.addFieldOffset(0, titleOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} videosOffset
 */
Netflix.Row.addVideos = function(builder, videosOffset) {
  builder.addFieldOffset(1, videosOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
Netflix.Row.createVideosVector = function(builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Netflix.Row.startVideosVector = function(builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Netflix.Row.endRow = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
Netflix.Lolomo = function() {
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
 * @returns {Netflix.Lolomo}
 */
Netflix.Lolomo.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Netflix.Lolomo=} obj
 * @returns {Netflix.Lolomo}
 */
Netflix.Lolomo.getRootAsLolomo = function(bb, obj) {
  return (obj || new Netflix.Lolomo).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
Netflix.Lolomo.prototype.id = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {number} index
 * @param {Netflix.Row=} obj
 * @returns {Netflix.Row}
 */
Netflix.Lolomo.prototype.rows = function(index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? (obj || new Netflix.Row).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
Netflix.Lolomo.prototype.rowsLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Netflix.Lolomo.startLolomo = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} idOffset
 */
Netflix.Lolomo.addId = function(builder, idOffset) {
  builder.addFieldOffset(0, idOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} rowsOffset
 */
Netflix.Lolomo.addRows = function(builder, rowsOffset) {
  builder.addFieldOffset(1, rowsOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
Netflix.Lolomo.createRowsVector = function(builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Netflix.Lolomo.startRowsVector = function(builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Netflix.Lolomo.endLolomo = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
Netflix.Lolomo.finishLolomoBuffer = function(builder, offset) {
  builder.finish(offset);
};

// Exports for Node.js and RequireJS
this.Netflix = Netflix;

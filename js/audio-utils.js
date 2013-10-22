var defer = require('when').defer;
var allen = require('allen');
var ctx = require('./context');

exports.createBufferSource = function createBufferSource (url) {
  var deferred = defer();
  var bufferNode = ctx.createBufferSource();
  var xhr = allen.getBuffer(URL(url), function () {
    ctx.decodeAudioData(xhr.response, function (buffer) {
      bufferNode.buffer = buffer;
      deferred.resolve(bufferNode);
    }, deferred.reject);
  });
  return deferred.promise;
};

function URL (url) {
  return './' + url + (allen.canPlayType('mp3') ? '.mp3' : '.ogg');
}

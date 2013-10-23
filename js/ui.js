var $ = require('./utils').$;
var ctx = require('./context');
var createBufferSource = require('./audio-utils').createBufferSource;
var PLAYING = 'icon-play';
var STOPPED = 'icon-stop';
var LOADING = 'icon-time';

/**
 * Creates a play/pause button, creating and destroying the
 * buffer node to reconnect into the chain
 */
exports.createBufferControls = function createBufferControls (bufferUrl, selector, callback) {
  var $element = $(selector);
  var bufferNode;
  $element.addEventListener('click', function (e) {
    e.preventDefault();
    if (bufferNode && (isLoading($element) || isPlaying($element))) {
      bufferNode.disconnect();
      bufferNode.stop(0);
      stopControl($element);
    } else {
      loadControl($element);
      createBufferSource(bufferUrl).then(function (node) {
        bufferNode = node;
        bufferNode.loop = true;
        callback(bufferNode);
        bufferNode.start(0);
        playControl($element);
      });
    }
  });
};

exports.createOscillatorControls = function createOscillatorControls (selector, callback) {
  var $element = $(selector);
  var osc;
  $element.addEventListener('click', function (e) {
    e.preventDefault();
    if (osc && isPlaying($element)) {
      osc.disconnect();
      osc.stop(0);
      stopControl($element);
    } else {
      osc = ctx.createOscillator();
      callback(osc);
      osc.start(0);
      playControl($element);
    }
  });
};

function isLoading ($el) { return getIcon($el).classList.contains(LOADING); }
function isPlaying ($el) { return getIcon($el).classList.contains(STOPPED); }
function getIcon ($el) { return $el.children[0]; }
function stopControl ($el) { setState(getIcon($el), PLAYING); }
function playControl ($el) { setState(getIcon($el), STOPPED); }
function loadControl ($el) { setState(getIcon($el), LOADING); }

function setState ($el, currentState) {
  [PLAYING, STOPPED, LOADING].map(function (state) {
    if (state !== currentState) $el.classList.remove(state);
  });
  $el.classList.add(currentState);
}

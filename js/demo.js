var ctx = require('./context');
var createControls = require('./ui').createControls;
var $ = require('./utils').$;
var dest = ctx.destination;

/**
 * Buffer Node Demo
 */
(function () {
  var filter = ctx.createBiquadFilter();
  filter.type.value = 0;
  filter.frequency.value = 22100;
  filter.connect(dest);

  createControls('audio/zircon-augment', '#demo-buffer-controls', function (bufferNode) {
    bufferNode.connect(filter);
  });

  var $slider = $('#demo-buffer-slider');
  var $feedback = $('#demo-buffer-feedback');
  $slider.addEventListener('change', function () {
    filter.frequency.value = $slider.value;
    $feedback.innerHTML = $slider.value;
  });
})();


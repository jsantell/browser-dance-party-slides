var ctx = require('./context');
var createBufferControls = require('./ui').createBufferControls;
var createOscillatorControls = require('./ui').createOscillatorControls;
var $ = require('./utils').$;
var dest = ctx.destination;
var Crusher = require('./crusher');
var FFT = require('./FFT');

/**
 * Buffer Node Demo
 */
(function () {
  var filter = ctx.createBiquadFilter();
  filter.type.value = 0;
  filter.frequency.value = 22100;
  filter.connect(dest);

  createBufferControls('audio/zircon-augment', '#demo-buffer-controls', function (bufferNode) {
    bufferNode.connect(filter);
  });

  var $slider = $('#demo-buffer-slider');
  var $feedback = $('#demo-buffer-feedback');
  $slider.addEventListener('change', function () {
    filter.frequency.value = $slider.value;
    $feedback.innerHTML = $slider.value;
  });
})();

// Oscillator Canvas Demo
(function () {
  var oscNode, type, freq;
  var fft = new FFT(ctx, {
    type: 'time',
    width: 2,
    canvas: $('#canvas-oscillator')
  });
  fft.connect(ctx.destination);

  createOscillatorControls('#demo-oscillator-controls', function (osc) {
    osc.type = type || 'sine';
    osc.frequency.value = freq || 440;
    osc.connect(fft.input);
    oscNode = osc;
  });
  var $sine = $('#demo-oscillator-sine');
  var $square = $('#demo-oscillator-square');
  var $sawtooth = $('#demo-oscillator-sawtooth');

  // Recreate the oscillator node on click, work around for
  // https://bugzilla.mozilla.org/show_bug.cgi?id=929621
  [$sine, $square, $sawtooth].map(function ($el) {
    $el.addEventListener('click', function (e) {
      e.preventDefault();
      type = $el.id.replace(/demo-oscillator-/,'');
      if ($('#demo-oscillator-controls i').classList.contains('icon-stop')) {
        $('#demo-oscillator-controls').click();
      }
      $('#demo-oscillator-controls').click();
    });
  });
 
  var $slider = $('#demo-oscillator-slider');
  $slider.addEventListener('change', function () {
    freq = $slider.value;
    if (!oscNode) return;
    oscNode.frequency.value = freq;
  });
})();

/**
 * Time Domain Demo
 */
(function () {
  var fft = new FFT(ctx, {
    type: 'time',
    width: 2,
    canvas: $('#canvas-timedomain')
  });
  fft.connect(ctx.destination);

  createBufferControls('audio/zircon-augment', '#demo-timedomain-controls', function (bufferNode) {
    bufferNode.connect(fft.input);
  });
})();

/**
 * Frequency Domain Demo
 */
(function () {
  var fft = new FFT(ctx, {
    type: 'frequency',
    canvas: $('#canvas-frequencydomain')
  });
  fft.connect(ctx.destination);

  createBufferControls('audio/zircon-augment', '#demo-frequencydomain-controls', function (bufferNode) {
    bufferNode.connect(fft.input);
  });
})();

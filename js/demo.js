var ctx = require('./context');
var createBufferControls = require('./ui').createBufferControls;
var createOscillatorControls = require('./ui').createOscillatorControls;
var $ = require('./utils').$;
var FFT = require('./FFT');

/**
 * Buffer Node Demo
 */
/*
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
*/

// Oscillator Canvas Demo
(function () {
  var oscNode, type, freq;
  var fft = new FFT(ctx, {
    type: 'time',
    width: 2,
    count: 512,
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
    count: 512,
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
    count: 512,
    canvas: $('#canvas-frequencydomain')
  });
  fft.connect(ctx.destination);

  createBufferControls('audio/zircon-augment', '#demo-frequencydomain-controls', function (bufferNode) {
    bufferNode.connect(fft.input);
  });
})();

/**
 * Beat Detection Demo
 */
(function () {
  var canvas = $('#canvas-beat');
  var canvasCtx = canvas.getContext('2d');
  var fft = new FFT(ctx, {
    type: 'frequency',
    count: 512,
    canvas: canvas,
    onBeat: onBeat,
    offBeat: offBeat,
    threshold: 0.97,
    decay: 0.001,
    wait: 1,
    range: [2,5]
  });
  fft.connect(ctx.destination);

  createBufferControls('audio/beat', '#demo-beat-controls', function (bufferNode) {
    bufferNode.connect(fft.input);
  });

  canvasCtx.lineWidth = 5;
  function onBeat (mag) {
    fft.fillStyle = '#ff0077';
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, -(fft.h/255) * mag);
    canvasCtx.lineTo(fft.w, -(fft.h/255) * mag);
  }

  function offBeat (mag) {
    canvasCtx.strokeStyle = '#00ff00';
    // Draw current average energy
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, fft.h - (mag*fft.h));
    canvasCtx.lineTo(fft.w, fft.h - (mag*fft.h));
    canvasCtx.stroke();
    canvasCtx.closePath();

    // Draw decay threshold
    canvasCtx.strokeStyle = '#ff0077';
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, fft.h - (fft.threshold*fft.h));
    canvasCtx.lineTo(fft.w, fft.h - (fft.threshold*fft.h));
    canvasCtx.stroke();
    canvasCtx.closePath();
    fft.fillStyle = '#000000';
  }
})();


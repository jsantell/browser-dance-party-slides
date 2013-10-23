var MAX_UINT8 = 255;

/**
 * Convert to Web Audio Component FFT-visualizer after 
 * switching to browserify modules
 */

function FFT (ctx, options) {
  var module = this;
  this.canvas = options.canvas;
  this.type = options.type || 'frequency';
  this.spacing = options.spacing || 1;
  this.width = options.width || 1;
  this.count = options.count || 1024;
  this.input = this.output = ctx.createAnalyser();
  this.proc = ctx.createScriptProcessor(256, 1, 1);
  this.data = new Uint8Array(this.input.frequencyBinCount);
  this.ctx = this.canvas.getContext('2d');

  this.h = this.canvas.height;
  this.w = this.canvas.width;

  this.input.connect(this.proc);
  this.proc.onaudioprocess = process.bind(null, module);
}

FFT.prototype.connect = function (node) {
  this.output.connect(node);
  this.proc.connect(node);
}

function process (module) {
  var ctx = module.ctx;
  var data = module.data;
  ctx.clearRect(0, 0, module.w, module.h);
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = module.width;

  if (module.type === 'frequency') {
    module.input.getByteFrequencyData(data);
    for (var i= 0, l = data.length; i < l && i < module.count; i++) {
      ctx.fillRect(
        i * (module.spacing + module.width),
        module.h,
        module.width,
        -(module.h / MAX_UINT8) * data[i]
      );
    }
  }
  else if (module.type === 'time') {
    module.input.getByteTimeDomainData(data);
    ctx.beginPath();
    ctx.moveTo(0, module.h / 2);
    for (var i= 0, l = data.length; i < l && i < module.count; i++) {
      ctx.lineTo(
        i * (module.spacing + module.width),
        (module.h / MAX_UINT8) * data[i]
      );
    }
    ctx.stroke();
    ctx.closePath();
  }
}

module.exports = FFT;

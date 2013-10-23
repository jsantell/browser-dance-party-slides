var CHANNELS = 2;
var BUFFER_SIZE = 1024;
function Crusher (ctx, options) {
  var module = this;
  var proc = ctx.createScriptProcessor(BUFFER_SIZE, CHANNELS, CHANNELS);
  this.input = this.output = proc;
  this.depth = 1;
  proc.onaudioprocess = function (e) {
    for (var i = 0; i < CHANNELS; i++) {
      crush(e.inputBuffer.getChannelData(i), e.outputBuffer.getChannelData(i), module.depth);
    }
  };
}

Crusher.prototype.connect = function (node) {
  this.output.connect(node);
};

function round (f) { return f > 0 ? Math.floor(f + 0.5) : Math.ceil(f - 0.5); }

function crush (input, output, depth) {
  var max = Math.pow(2, depth);
  for (var i = 0; i < input.length; i++) {
    output[i] = round((input[i] + 1) * max) / max - 1;
  }
}

module.exports = Crusher;

var ctx = new (window.AudioContext || window.webkitAudioContext)();

// Bind to window for live demos
window.ctx = ctx;
module.exports = ctx;

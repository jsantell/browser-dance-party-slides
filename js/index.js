var Reveal = require('reveal');
var prettify = require('prettify');
require('./demo');

// Syntax Highlighting
prettify.prettyPrint();

// Reveal
Reveal.initialize({
  controls: false,
  progress: true,
  history: true,
  center: true,
  transition: 'fade'
});

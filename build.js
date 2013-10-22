var fs = require('fs');
var browserify = require('browserify');
var shim = require('browserify-shim');
var BUILT_FILE = './build/build.js';

shim(browserify(), {
  reveal: { path: './vendor/scripts/reveal.js', exports: 'Reveal' },
  prettify: { path: './vendor/scripts/prettify.js', exports: 'window' }
})
.require(require.resolve('./js/index.js'), { entry: true })
.bundle(function (err, src) {
  if (err) return console.error(err);
  fs.writeFileSync(BUILT_FILE, src);
});

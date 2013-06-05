var silly = require('../');
var scope = silly();

scope.on('frequencies', function (freqs) {
    console.dir(freqs);
});
process.stdin.pipe(scope);

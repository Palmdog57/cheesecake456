const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'/home/ubuntu/cheesecake456/bot.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },

log = SimpleNodeLogger.createSimpleLogger( opts );

function noOp() {};

exports.Cleanup = function Cleanup(callback) {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp;
  process.on('cleanup',callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
		log.info('CTRL-C...');
		console.log('Ctrl-C...');
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
		log.info('Uncaught Exception...');
		console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
  });
};
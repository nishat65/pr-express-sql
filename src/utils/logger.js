const bunyan = require('bunyan');
const path = require('path');

let log;

if (process.env.NODE_ENV === 'test') {
    log = bunyan.createLogger({
        name: 'backend',
        streams: [
            {
                level: 'info',
                stream: process.stdout,
            },
            {
                level: 'error',
                stream: process.stdout,
            },
        ],
        serializers: bunyan.stdSerializers,
        src: true,
    });
} else {
    log = bunyan.createLogger({
        name: 'backend',
        streams: [
            {
                level: 'info',
                stream: process.stdout,
            },
            {
                level: 'error',
                path: path.join(__dirname, '..', 'logs', 'error.log'),
            },
            {
                path: path.join(__dirname, '..', 'logs', 'info.log'),
            },
        ],
        serializers: bunyan.stdSerializers,
        src: true,
    });

    log.on('error', (err) => {
        console.error('Bunyan error:', err);
    });
}

module.exports = log;

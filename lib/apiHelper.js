var https = require('https');

function APIHelper(config) {
    this.config = config;
}

APIHelper.prototype.request = function(method, endpoint, payload, cb) {
    var req = https.request(
        {
            auth: this.config.apiKey + ':',
            method: method,
            hostname: this.config.hostname,
            port: this.config.port,
            path: endpoint
        },
        function(res) {
            var data = [];

            res
            .on('data', function(chunk) {
                data.push(chunk);
            })
            .on('end', function() {
                cb(null, JSON.parse(Buffer.concat(data)));
            });
        }
    );

    req.end();

    req.on('error', function(err) {
        cb(err);
    });
};

module.exports = APIHelper;

var APIHelper = require('./lib/apiHelper.js');
//var Company   = require('./lib/company.js');

function CompaniesHouseAPI(config) {
    if (typeof config !== 'object')           throw('No config');
    if (typeof config.apiKey === 'undefined') throw('No apiKey');

    if (typeof config.hostname === 'undefined') config.hostname = 'api.companieshouse.gov.uk';
    if (typeof config.port     === 'undefined') config.port     = 443;

    this.api = new APIHelper(config);
}

CompaniesHouseAPI.prototype.company = function(companyNumber, cb) {
    var self = this;

    this.api.request('GET', '/company/' + companyNumber, null, function(err, res) {
        if (err) {
            cb(err);
        }
        else {
            res.registeredOfficeAddress = function(cb) { self.registeredOfficeAddress(companyNumber, cb); };
            res.officers                = function(cb) { self.officers(companyNumber, cb); };
            res.filingHistory           = function(cb) { self.filingHistory(companyNumber, cb); };
            res.insolvency              = function(cb) { self.insolvency(companyNumber, cb); };

            cb(null, res);
        }
    });
};

CompaniesHouseAPI.prototype.registeredOfficeAddress = function(companyNumber, cb) {
    this.api.request('GET', '/company/' + companyNumber + '/registered-office-address', null, function(err, res) {
        cb(err, res);
    });
};

CompaniesHouseAPI.prototype.officers = function(companyNumber, cb) {
    this.api.request('GET', '/company/' + companyNumber + '/officers', null, function(err, res) {
        cb(err, res);
    });
};

CompaniesHouseAPI.prototype.filingHistory = function(companyNumber, cb) {
    this.api.request('GET', '/company/' + companyNumber + '/filing-history', null, function(err, res) {
        cb(err, res);
    });
};

CompaniesHouseAPI.prototype.insolvency = function(companyNumber, cb) {
    this.api.request('GET', '/company/' + companyNumber + '/insolvency', null, function(err, res) {
        cb(err, res);
    });
};

module.exports = CompaniesHouseAPI;

```perl
var CompaniesHouseAPI = require('companies-house-api');
var async = require('async');

var chapi = new CompaniesHouseAPI({apiKey: 'yourApiKey'});

// FIXME: use async waterfall
async.waterfall(
    [
        function(next) {
            chapi.company('07296558', function(err, company) {
                next(err, company);
            });
        },
        function(company, next) {
            company.registeredOfficeAddress(function(err, registeredOfficeAddress) {
                next(err, company, registeredOfficeAddress);
            });
        },
        function(company, registeredOfficeAddress, next) {
            company.officers(function(err, officers) {
                next(err, company, registeredOfficeAddress, officers);
            });
        },
        function(company, registeredOfficeAddress, officers, next) {
            company.filingHistory(function(err, filingHistory) {
                next(err, company, registeredOfficeAddress, officers, filingHistory);
            });
        },
        function(company, registeredOfficeAddress, officers, filingHistory, next) {
            company.insolvency(function(err, insolvency) {
                next(err, company, registeredOfficeAddress, officers, filingHistory, insolvency);
            });
        }
    ],
    function(err, company, registeredOfficeAddress, officers, filingHistory, insolvency) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            console.log('Company name: ' + company.company_name);
            console.log('Postcode: ' + registeredOfficeAddress.postal_code);
            console.log('Total officers: ' + officers.total_results);
            console.log('Total filing history count: ' + filingHistory.total_count);
            console.log('Insolvency dump: ' + insolvency);
        }
    }
);
```

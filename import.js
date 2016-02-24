require('./init');

var _ = require('lodash'),
    Q = require('q'),
    fs = require('fs'),
    parse = require('csv-parse'),
    org = process.argv[2],
    file = process.argv[3],
    mongoose = require('mongoose'),
    Influencer = mongoose.model('Influencer');

// Build the parser
var stats = {
    columns: [],
    uses: [],
    verticals: {},
    successes: 0,
    failures: []
};
var line = 1;
var promises = [];
var parser = parse({ delimiter: ';' });
parser.on('readable', function(){
    var record;
    while (record = parser.read()) {
        // Handle the header names
        if (record[0] === 'name.first') {
            console.log('Record: ', record);
            stats.columns = record;
            for (var i = 0; i < record.length; i++) {
                stats.uses[i] = 0;
            }
            continue;
        }

        // Handle each result
        var influencer = new Influencer({
            hasImage: false,
            organization: org
        });
        for (var i = 0; i < record.length; i++) {
            if (record[i]) {
                if (stats.columns[i] === 'verticals') {
                    record[i] = record[i].split(',');
                    for (var j = 0; j < record[i].length; j++) {
                        record[i][j] = record[i][j].trim();
                        stats.verticals[record[i][j]] = true;
                    }
                }
                _.set(influencer, stats.columns[i], record[i]);
                stats.uses[i]++;
            }
        }
        promises.push(influencer
            .savePromise()
            .then(() => {
                stats.successes++;
            })
            .fail((function(line){
                return function(err){
                    console.log('Error: ', err);
                    stats.failures.push({
                        error: err,
                        line: line
                    });
                };
            })(line)));
        line++;
    }
});
parser.on('error', function(err){
    console.log(err.message);
});
parser.on('finish', function(){
    Q.all(promises)
        .then(() => {
            var result = {};
            for (var i = 0; i < stats.columns.length; i++) {
                result[stats.columns[i]] = stats.uses[i];
            }
            console.log('Columns: ', result);
            console.log('Verticals: ', stats.verticals);
            console.log('Successes: ', stats.successes);
            console.log('Failures:');
            stats.failures.forEach((failure) => {
                console.log(failure.line+': ', failure.error);
            })
            process.exit(0);
        })
});

fs
    .createReadStream(file)
    .pipe(parser);
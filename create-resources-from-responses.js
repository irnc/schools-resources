const _ = require('lodash');
const fs = require('fs');
const responses = require('./data/responses.json');

const resourceGroups = _.groupBy(responses, 'referenceId');

_.forEach(resourceGroups, (resources, referenceId) => {
  const approvedResources = _(resources)
    .filter({ resolution: 'use' })
    .map(r => _.omit(r, ['referenceId', 'resolution']))
    .value();
  
  write(`resources/${referenceId}`, approvedResources);
});

function write(file, data) {
  fs.writeFileSync(`./data/${file}.json`, JSON.stringify(data, null, 2) + '\n');
}

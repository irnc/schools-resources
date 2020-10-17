// Code to get one-line JSON for READER_CREDENTIALS env variable.
//
// node stringify-key.js [service-account-key.json]

const fs = require('fs');

const credentialsJson = fs.readFileSync(process.argv[2], { encoding: 'utf-8' });
console.log(JSON.stringify(JSON.parse(credentialsJson)));

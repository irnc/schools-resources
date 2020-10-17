const { google } = require('googleapis');
const _ = require('lodash');
const fs = require('fs');

const { RESPONSES_SPREADSHEET_ID, READER_CREDENTIALS } = process.env;

const credentials = JSON.parse(READER_CREDENTIALS);
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
  ],
);

const sheets = google.sheets({
  version: 'v4',
  auth,
});

const expectedColumns = [
  'Timestamp',
  'Школа',
  'Ссылка на Telegram-группу',
  'Moderator resolution',
];

const props = [
  'timestamp',
  'referenceId',
  'url',
  'resolution',
];
 
const main = async () => {
  console.log(`getting values from ${RESPONSES_SPREADSHEET_ID}`);

  const { data } = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: RESPONSES_SPREADSHEET_ID,
      // There are only A-D columns, with 3000+ schools,
      // so 4000 should be enough.
      // Unable to parse range: Index!A1:D4000
      range: '\'Form Responses 1\'!A1:D4000',
    },
  );

  const [columns, ...rows] = data.values;

  if (!_.isEqual(columns, expectedColumns)) {
    throw new Error('Unexpected list of columns');
  }

  const output = rows.map(row => _.zipObject(props, row));

  fs.writeFileSync('./data/responses.json', JSON.stringify(output, null, 2) + '\n');
};

main();

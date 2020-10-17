School-related resources are crowd-sources using Google Forms.

Forms write responses to Sheets, which has a macros causing workflow dispatch at GitHub Actions.

# Needed environment variables

Configuration to this tool is passed throught environment variables. Which are sources from project secrets in GitHub Actions context.

- RESPONSES_SPREADSHEET_ID

  ID of the spreadsheet which stores form responses.

- READER_CREDENTIALS

  JSON key of the service account having Viewer access to the spreadsheet.

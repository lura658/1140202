const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1bM9g5Cljc5HELMttKRe1zhydFEiW8SvONQowcXLnXCM/edit?gid=0#gid=0';
const LEARNERS_SHEET_NAME = 'learners';
const SCORES_SHEET_NAME = 'scores';

function doGet(e) {
  const params = e.parameter || {};

  if (params.action === 'registerLearner') {
    const result = registerLearner(params);
    return outputJson(result, params.callback);
  }

  setupSheets();
  return outputJson({ ok: true, message: 'Score recorder is ready.' }, params.callback);
}

function doPost(e) {
  const params = e.parameter || {};

  if (params.action === 'saveScore') {
    return outputJson(saveScore(params));
  }

  return outputJson({ ok: false, message: 'Unknown action.' });
}

function setupSheets() {
  getLearnersSheet();
  getScoresSheet();
  return { ok: true, message: 'Sheets are ready.' };
}

function registerLearner(data) {
  const name = String(data.name || '').trim();
  const username = normalizeUsername(data.username || '');

  if (!name || !username) {
    return { ok: false, message: 'Name and username are required.' };
  }

  const sheet = getLearnersSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow >= 2) {
    const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
    const duplicate = values.find((row) => normalizeUsername(row[1]) === username);

    if (duplicate && duplicate[0] !== name) {
      return { ok: false, message: 'This username is already used.' };
    }

    if (duplicate) {
      return { ok: true, message: 'Welcome back.' };
    }
  }

  sheet.appendRow([name, username, new Date()]);
  return { ok: true, message: 'Registered.' };
}

function saveScore(data) {
  const sheet = getScoresSheet();
  const username = normalizeUsername(data.username || '');

  if (!username) {
    return { ok: false, message: 'Missing username.' };
  }

  const rowData = [
    new Date(),
    data.name || '',
    username,
    data.chapterIndex || '',
    data.chapter || '',
    Number(data.score || 0),
    Number(data.totalScore || 0),
    data.answer || '',
    data.correctAnswer || '',
    data.submittedAt || '',
  ];
  const targetRow = findExistingScoreRow(sheet, username, data.chapterIndex || '');

  if (targetRow > 0) {
    sheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { ok: true };
}

function getSpreadsheet() {
  if (!SPREADSHEET_URL || SPREADSHEET_URL === 'PASTE_YOUR_GOOGLE_SHEET_URL_HERE') {
    return SpreadsheetApp.getActiveSpreadsheet();
  }

  return SpreadsheetApp.openByUrl(SPREADSHEET_URL);
}

function getLearnersSheet() {
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(LEARNERS_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEARNERS_SHEET_NAME);
    sheet.appendRow(['name', 'username', 'createdAt']);
  }

  return sheet;
}

function getScoresSheet() {
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SCORES_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SCORES_SHEET_NAME);
    sheet.appendRow([
      'timestamp',
      'name',
      'username',
      'chapterIndex',
      'chapter',
      'score',
      'totalScore',
      'answer',
      'correctAnswer',
      'submittedAt',
    ]);
  }

  return sheet;
}

function findExistingScoreRow(sheet, username, chapterIndex) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const values = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

  for (let index = 0; index < values.length; index += 1) {
    const row = values[index];
    if (normalizeUsername(row[2]) === username && String(row[3]) === String(chapterIndex)) {
      return index + 2;
    }
  }

  return -1;
}

function normalizeUsername(value) {
  return String(value || '').trim().toLowerCase();
}

function outputJson(data, callback) {
  const text = callback
    ? `${callback}(${JSON.stringify(data)})`
    : JSON.stringify(data);
  const mimeType = callback
    ? ContentService.MimeType.JAVASCRIPT
    : ContentService.MimeType.JSON;

  return ContentService
    .createTextOutput(text)
    .setMimeType(mimeType);
}

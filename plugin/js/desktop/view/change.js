import util from '../../util';
import {getFormFields, getRecord} from '../../service/index';

let tableRowNumber;
let conf;
let changeEventField;

export function changeEvents(config) {
  conf = config.conf;
  changeEventField = conf.changeEventField;
  const ChangeEvents = [
    'app.record.create.change.' + changeEventField,
    'app.record.edit.change.' + changeEventField,
  ];
  tableRowNumber = Number(conf.table_row_number);

  return {
    binding: () => {
      kintone.events.on(ChangeEvents, handleChangeEvents);
    },
  };
}

function handleChangeEvents(event) {
  const record = event.record;
  if (record[changeEventField].value === undefined) {
    setEmptyTableData(record);
    return event;
  }

  getFormFields({app: kintone.app.getId()})
    .then((resp) => {
      const properties = resp.properties;
      const relatedRecId = record[changeEventField].value;
      const relatedAppId = properties[conf.lookupField].lookup.relatedApp.app;

      getRecord({
        app: relatedAppId,
        id: relatedRecId,
      }).then(({record: relatedRecord}) => {
        setTableData(relatedRecord);
      }).catch(err => {
        throw err;
      });
    })
    .catch(error => {
      throw error;
    });
}

function setTableData(relatedRecord) {
  const recordDetail = kintone.app.record.get();
  const tableCode = conf.copyToTable;
  const newTable = getRelatedTableRow(relatedRecord, recordDetail, tableCode);
  recordDetail.record[tableCode].value = newTable;
  kintone.app.record.set(recordDetail);
}

function setEmptyTableData(record) {
  const tableCode = conf.copyToTable;
  record[tableCode].value = [];
}

function getListRowValue(newRelatedRow, fristRowInTable) {
  Object.keys(fristRowInTable).forEach((key) => {
    newRelatedRow.newRow.value[key] = {};
    newRelatedRow.newRow = parseRowField(
      newRelatedRow.value,
      fristRowInTable,
      key,
      newRelatedRow.newRow
    );
  });
  return newRelatedRow.newRow;
}

function getRelatedTableRow(relatedRecord, recordDetail, tableCode) {
  const fristRowInTable = recordDetail.record[tableCode].value[0].value;
  const relatedTableCode = conf.copyFromTable;
  const relatedTableList = relatedRecord[relatedTableCode].value;
  const listRowValue = relatedTableList
    .map((relatedRow) => ({...relatedRow, newRow: {value: {}}}))
    .map((newRelatedRow) => getListRowValue(newRelatedRow, fristRowInTable));
  return listRowValue;
}

function parseRowField(relatedFields, fristRowInTable, key, row) {
  for (let i = 1; i < tableRowNumber + 1; i++) {
    const copyFromField = conf['table_row' + i].column1;
    const relatedFieldValue = relatedFields[copyFromField].value;
    const rowValue = row.value[key];
    const copyToField = conf['table_row' + i].column2;

    if (key !== copyToField) {
      row.value[key] = createNotSettedFieldData(fristRowInTable, key, rowValue);
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(fristRowInTable, copyToField)) {
      row.value[key] = createSettedFieldData(
        fristRowInTable,
        key,
        relatedFieldValue,
        rowValue
      );
      break;
    }
  }
  return row;
}

function createSettedFieldData(
  thisTableFields,
  key,
  relatedFieldValue,
  rowValue
) {
  switch (thisTableFields[key].type) {
    case 'SINGLE_LINE_TEXT':
    case 'NUMBER':
    case 'MULTI_LINE_TEXT':
    case 'RICH_TEXT':
    case 'DROP_DOWN':
    case 'LINK':
    case 'DATETIME':
    case 'DATE':
    case 'TIME':
    case 'RADIO_BUTTON':
      rowValue.value = relatedFieldValue;
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
    case 'CHECK_BOX':
    case 'MULTI_SELECT':
      for (let vl = 0; vl < relatedFieldValue.length; vl++) {
        rowValue.value[vl] = relatedFieldValue[vl];
      }
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
    case 'USER_SELECT':
    case 'GROUP_SELECT':
    case 'ORGANIZATION_SELECT':
      rowValue.value = [];
      for (let i = 0; i < relatedFieldValue.length; i++) {
        rowValue.value[i] = {};
        rowValue.value[i].code = relatedFieldValue[i].code;
      }
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
  }
  return rowValue;
}

function createNotSettedFieldData(thisTableFields, key, rowValue) {
  switch (thisTableFields[key].type) {
    case 'RICH_TEXT':
    case 'SINGLE_LINE_TEXT':
    case 'NUMBER':
    case 'MULTI_LINE_TEXT':
    case 'DATETIME':
    case 'LINK':
    case 'CALC':
      rowValue.value = '';
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
    case 'DROP_DOWN':
    case 'DATE':
    case 'TIME':
      rowValue.value = null;
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
    case 'RADIO_BUTTON':
      rowValue.value = thisTableFields[key].value;
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
    case 'CHECK_BOX':
    case 'MULTI_SELECT':
    case 'USER_SELECT':
    case 'GROUP_SELECT':
    case 'ORGANIZATION_SELECT':
    case 'FILE':
      rowValue.value = [];
      rowValue.type = util.escapeHtml(thisTableFields[key].type);
      break;
  }
  return rowValue;
}

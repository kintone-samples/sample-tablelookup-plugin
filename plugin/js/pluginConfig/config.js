let conf;
let enableRowNumber;
let tableRowNumber;
let $;

export function getConfig(jQuery, PLUGIN_ID) {
  conf = kintone.plugin.app.getConfig(PLUGIN_ID);
  if (!conf) {
    return false;
  }

  enableRowNumber = Number(conf.enable_row_number);
  tableRowNumber = Number(conf.table_row_number);
  $ = jQuery;

  return {
    parseEnableFieldRow,
    getFieldRow,
    createConfig,
    conf,
    enableRowNumber,
    tableRowNumber
  };
}

function parseEnableFieldRow() {
  // JSON parse
  for (let i = 1; i < enableRowNumber + 1; i++) {
    conf['enablefield_row' + i] = JSON.parse(conf['enablefield_row' + i]);
  }
  for (let i = 1; i < tableRowNumber + 1; i++) {
    conf['table_row' + i] = JSON.parse(conf['table_row' + i]);
  }
}

function getFieldRow() {
  const fieldRow = [];
  for (let i = 1; i < enableRowNumber + 1; i++) {
    const column = conf['enablefield_row' + i].column1;
    if (column) {
      fieldRow.push(column);
    }
  }
  return fieldRow;
}

function createConfig() {
  let config = {};

  // Save lookupField setting to config;
  config.lookupField = String($('.lookupField').val());

  // Set change event field to config;
  config.changeEventField = String($('#changeEventField').val());

  // Set enablefield setting to config;
  config = createConfigFromEnableField(config);

  // Set tablefield setting to config;
  config = createConfigFromTableField(config);

  // Set copyfield setting to config;
  config = createConfigFromCopyField(config);

  return config;
}

function createConfigFromTableField(config) {
  config.copyFromTable = String($('.copyFromTable').val());
  config.copyToTable = String($('.copyToTable').val());
  return config;
}

function createConfigFromEnableField(config) {
  let totalrows_enablefield = getTotalRowsFromEnableField();
  for (let h = 1; h <= totalrows_enablefield; h++) {
    const lookupfield_value = getLookupFieldValue(h);
    if (lookupfield_value === '') {
      totalrows_enablefield -= 1;
      h--;
      continue;
    }
    const row_enablefield = {column1: lookupfield_value};
    config['enablefield_row' + h] = JSON.stringify(row_enablefield);
  }
  config.enable_row_number = String(totalrows_enablefield);

  return config;
}

function getLookupFieldValue(index) {
  return $('#tc-plugin-enablefield-tbody > tr')
    .eq(index)
    .find('.tc-plugin-column1')
    .val();
}

function getTotalRowsFromEnableField() {
  return $('#tc-plugin-enablefield-tbody').find('tr').length - 1;
}

function createConfigFromCopyField(config) {
  let totalRowsFromCopyField = getTotalRowsFromCopyField();
  for (let y = 1; y <= totalRowsFromCopyField; y++) {
    const valuecopyfrom = getValueCopyFrom(y);
    const valuecopyto = getValueCopyTo(y);
    if (valuecopyfrom === '' && valuecopyto === '') {
      totalRowsFromCopyField -= 1;
      y--;
      continue;
    }
    const row_table = {column1: valuecopyfrom, column2: valuecopyto};
    config['table_row' + y] = JSON.stringify(row_table);
  }
  config.table_row_number = String(totalRowsFromCopyField);

  return config;
}

function getTotalRowsFromCopyField() {
  return $('#tc-plugin-copyfield-tbody').find('tr').length - 1;
}

function getValueCopyFrom(index) {
  return $('#tc-plugin-copyfield-tbody > tr')
    .eq(index)
    .find('.tc-plugin-column1')
    .val();
}

function getValueCopyTo(index) {
  return $('#tc-plugin-copyfield-tbody > tr')
    .eq(index)
    .find('.tc-plugin-column2')
    .val();
}

import common from './common';
import util from '../../util';
import service from '../../service';

export function getInit($, config) {
  const conf = config.conf;
  const ENABLE_ROW_NUM = config.enableRowNumber;
  const TABLE_ROW_NUM = config.tableRowNumber;
  const thisAppId = common.getCurrentAppId();

  function setEnableTableDefault() {
    for (let i = 1; i <= ENABLE_ROW_NUM; i++) {
      $('#tc-plugin-enablefield-tbody > tr')
        .eq(0)
        .clone(true)
        .insertAfter($('#tc-plugin-enablefield-tbody > tr').eq(i - 1));
      $('#tc-plugin-enablefield-tbody > tr:eq(' + i + ') .tc-plugin-column1').val(
        conf['enablefield_row' + i].column1
      );
    }
  }

  function setCopyFieldTableDefault() {
    for (let i = 1; i <= TABLE_ROW_NUM; i++) {
      $('#tc-plugin-copyfield-tbody > tr')
        .eq(0)
        .clone(true)
        .insertAfter($('#tc-plugin-copyfield-tbody > tr').eq(i - 1));
      $('#tc-plugin-copyfield-tbody > tr:eq(' + i + ') .tc-plugin-column1').val(
        conf['table_row' + i].column1
      );
      $('#tc-plugin-copyfield-tbody > tr:eq(' + i + ') .tc-plugin-column2').val(
        conf['table_row' + i].column2
      );
    }
  }

  function setDefault() {
    $('.lookupField').val(conf.lookupField);
    $('#changeEventField').val(conf.changeEventField);
    $('.copyFromTable').val(conf.copyFromTable);
    $('.copyToTable').val(conf.copyToTable);

    if (ENABLE_ROW_NUM > 0) {
      setEnableTableDefault();
    } else {
      $('#tc-plugin-enablefield-tbody > tr')
        .eq(0)
        .clone(true)
        .insertAfter($('#tc-plugin-enablefield-tbody > tr'))
        .eq(0);
    }

    if (TABLE_ROW_NUM > 0) {
      setCopyFieldTableDefault();
    } else {
      $('#tc-plugin-copyfield-tbody > tr')
        .eq(0)
        .clone(true)
        .insertAfter($('#tc-plugin-copyfield-tbody > tr'))
        .eq(0);
    }
    common.checkRowNumber();
  }

  function setLookupAndCopyToTableDefault(resp) {
    const fields = resp.properties;
    const $option = $('<option>');

    for (const key in fields) {
      if (!Object.prototype.hasOwnProperty.call(fields, key)) {
        continue;
      }
      const prop = fields[key];
      // lookup Field
      if (Object.prototype.hasOwnProperty.call(fields[key], 'lookup')) {
        $option.attr('value', util.escapeHtml(prop.code));
        $option.text(util.escapeHtml(prop.label));
        $('.lookupField').append($option.clone());
      }
      // current Table
      if (prop.type === 'SUBTABLE') {
        $option.attr('value', util.escapeHtml(prop.code));
        $option.text(util.escapeHtml(prop.code));
        $('.copyToTable').append($option.clone());
      }
    }
  }

  function setMappingFieldDefult(resp) {
    const lookup_field = conf.lookupField;
    const lookupMappingFields = resp.properties[lookup_field].lookup.fieldMappings;
    for (const MappingKey in lookupMappingFields) {
      if (!Object.prototype.hasOwnProperty.call(lookupMappingFields, MappingKey)) {
        continue;
      }
      const prop = lookupMappingFields[MappingKey];
      const $option = $('<option>');
      const recNoField = conf.changeEventField;
      if (prop.field !== recNoField) {
        $option.attr('value', util.escapeHtml(prop.field));
        $option.text(util.escapeHtml(prop.field));
        $('#tc-plugin-enablefield-tbody > tr:eq(0) .tc-plugin-column1').append($option.clone());
        $('#tc-plugin-enablefield-tbody > tr:eq(1) .tc-plugin-column1').append($option.clone());
      }
    }
  }

  function setCopyFromTableDefault(res) {
    const relatedFields = res.properties;
    const $option = $('<option>');
    for (const relatedField in relatedFields) {
      if (!Object.prototype.hasOwnProperty.call(relatedFields, relatedField)) {
        continue;
      }
      const relatedFieldData = relatedFields[relatedField];
      switch (relatedFieldData.type) {
        case 'SUBTABLE':
          $option.attr('value', util.escapeHtml(relatedFieldData.code));
          $option.text(util.escapeHtml(relatedFieldData.code));
          $('.copyFromTable').append($option.clone());
          break;
        default:
          break;
      }
    }
  }

  function setCopyToFieldDefault(resp) {
    const $option = $('<option>');
    if (!conf.copyToTable) {
      return;
    }
    const currentTable = conf.copyToTable;
    const currentTableFields = resp.properties[currentTable].fields;
    for (const tableField in currentTableFields) {
      if (!Object.prototype.hasOwnProperty.call(currentTableFields, tableField)) {
        continue;
      }
      const tableFieldData = currentTableFields[tableField];
      switch (tableFieldData.type) {
        case 'SINGLE_LINE_TEXT':
        case 'NUMBER':
        case 'MULTI_LINE_TEXT':
        case 'RICH_TEXT':
        case 'CHECK_BOX':
        case 'RADIO_BUTTON':
        case 'DROP_DOWN':
        case 'MULTI_SELECT':
        case 'LINK':
        case 'DATE':
        case 'TIME':
        case 'DATETIME':
        case 'USER_SELECT':
        case 'GROUP_SELECT':
        case 'ORGANIZATION_SELECT':
          $option.attr('value', util.escapeHtml(tableFieldData.code));
          $option.attr('name', util.escapeHtml(tableFieldData.type));
          $option.text(util.escapeHtml(tableFieldData.label));
          $('#tc-plugin-copyfield-tbody > tr:eq(0) .tc-plugin-column2').append($option.clone());
          break;
        default:
          break;
      }
    }
  }

  function setCopyFromFieldDefault(response) {
    const copyFromTable = conf.copyFromTable;
    if (!copyFromTable) {
      return;
    }

    const copyFromFields = response.properties[copyFromTable].fields;
    for (const fromField in copyFromFields) {
      if (!Object.prototype.hasOwnProperty.call(copyFromFields, fromField)) {
        continue;
      }
      const copyFromFieldData = copyFromFields[fromField];
      const $option = $('<option>');
      switch (copyFromFieldData.type) {
        case 'SINGLE_LINE_TEXT':
        case 'NUMBER':
        case 'MULTI_LINE_TEXT':
        case 'RICH_TEXT':
        case 'CHECK_BOX':
        case 'RADIO_BUTTON':
        case 'DROP_DOWN':
        case 'MULTI_SELECT':
        case 'LINK':
        case 'DATE':
        case 'TIME':
        case 'DATETIME':
        case 'USER_SELECT':
        case 'GROUP_SELECT':
        case 'ORGANIZATION_SELECT':
          $option.attr('value', util.escapeHtml(copyFromFieldData.code));
          $option.attr('name', util.escapeHtml(copyFromFieldData.type));
          $option.text(util.escapeHtml(copyFromFieldData.label));
          $('#tc-plugin-copyfield-tbody > tr:eq(0) .tc-plugin-column1').append($option.clone());
          break;
        default:
          break;
      }
    }
  }

  const setDropdownDefault = function() {
    service.getFormFieldPreview(thisAppId).then((resp) => {
      setLookupAndCopyToTableDefault(resp);
      setCopyToFieldDefault(resp);
      if (!conf.lookupField) {
        setDefault();
        return;
      }

      setMappingFieldDefult(resp);
      const lookup_field = conf.lookupField;
      const relateAppId = resp.properties[lookup_field].lookup.relatedApp.app;
      service.getFormFieldPreview(relateAppId).then((res) => {
        setCopyFromTableDefault(res);
        setCopyFromFieldDefault(res);
        setDefault();
      });
    });
  };
  return {setDropdownDefault};
}

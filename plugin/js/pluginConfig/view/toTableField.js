import util from '../../util';
import common from './common';

jQuery.noConflict();

export default (function($) {
  'use strict';

  const dataClear = function() {
    const rowNumber = $('#tc-plugin-copyfield-tbody').find('tr').length;
    if (rowNumber > 2) {
      $('#tc-plugin-copyfield-tbody > tr:gt(1)').remove();
    }
    $('#tc-plugin-copyfield-tbody > tr:eq(0) .tc-plugin-column2 > option:gt(0)').remove();
    $('#tc-plugin-copyfield-tbody > tr:eq(1) .tc-plugin-column2 > option:gt(0)').remove();
    common.checkRowNumber();
  };

  const setDropdown = function(resp) {
    const currentTable = $('.copyToTable').val();
    const currentTableFields = resp.properties[currentTable].fields;
    const $option = $('<option>');
    for (const tf in currentTableFields) {
      if (!Object.prototype.hasOwnProperty.call(currentTableFields, tf)) {
        continue;
      }
      const p = currentTableFields[tf];
      switch (p.type) {
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
          $option.attr('value', util.escapeHtml(p.code));
          $option.attr('name', util.escapeHtml(p.type));
          $option.text(util.escapeHtml(p.label));
          $('#tc-plugin-copyfield-tbody > tr:eq(0) .tc-plugin-column2').append($option.clone());
          $('#tc-plugin-copyfield-tbody > tr:eq(1) .tc-plugin-column2').append($option.clone());
          break;
        default:
          break;
      }
    }
  };
  return {setDropdown, dataClear};
})(jQuery);

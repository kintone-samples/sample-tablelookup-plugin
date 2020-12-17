import common from './common';
import util from '../../util';

jQuery.noConflict();

export default (function($) {
  'use strict';

  const dataClear = function() {
    const rownum_enable = $('#tc-plugin-enablefield-tbody').find('tr').length;
    const rownum_table = $('#tc-plugin-copyfield-tbody').find('tr').length;
    // delete existed table data
    if (rownum_enable > 2) {
      $('#tc-plugin-enablefield-tbody > tr:gt(1)').remove();
    }
    if (rownum_table > 2) {
      $('#tc-plugin-copyfield-tbody > tr:gt(1)').remove();
    }
    $('#tc-plugin-enablefield-tbody > tr:eq(0) .tc-plugin-column1 > option:gt(0)').remove();
    $('#tc-plugin-enablefield-tbody > tr:eq(1) .tc-plugin-column1 > option:gt(0)').remove();
    $('#tc-plugin-copyfield-tbody > tr:eq(0) .tc-plugin-column1 > option:gt(0)').remove();
    $('#tc-plugin-copyfield-tbody > tr:eq(1) .tc-plugin-column1 > option:gt(0)').remove();
    $('.copyFromTable > option:gt(0)').remove();
    common.checkRowNumber();
  };

  const setChangeEventField = function(resp) {
    const lookup_field = $('.lookupField').val();
    const mappingFields = resp.properties[lookup_field].lookup.fieldMappings;
    const elmParent = $('.lookupField').parent();

    let isDisplay = true;
    let changeEventFieldValue = '';
    for (let mf = 0; mf < mappingFields.length; mf++) {
      const relatedField = mappingFields[mf].relatedField;
      if (
        relatedField === 'レコード番号' ||
        relatedField === '记录编号' ||
        relatedField === 'Record_number'
      ) {
        isDisplay = false;
        changeEventFieldValue = mappingFields[mf].field;
        break;
      }
    }

    $(elmParent).parent().find('#msg2').css({display: isDisplay ? 'block' : 'none'});
    $('#changeEventField').val(changeEventFieldValue);
  };

  const setMappingField = function(resp) {
    const lookupFieldCode = $('.lookupField').val();
    const lookupMappingFields = resp.properties[lookupFieldCode].lookup.fieldMappings;
    for (const MappingKey in lookupMappingFields) {
      if (!Object.prototype.hasOwnProperty.call(lookupMappingFields, MappingKey)) {
        continue;
      }
      const prop = lookupMappingFields[MappingKey];
      const $option = $('<option>');
      const recNoField = $('#changeEventField').val();
      if (prop.field !== recNoField) {
        $option.attr('value', util.escapeHtml(prop.field));
        $option.text(util.escapeHtml(prop.field));
        $('#tc-plugin-enablefield-tbody > tr:eq(0) .tc-plugin-column1').append($option.clone());
        $('#tc-plugin-enablefield-tbody > tr:eq(1) .tc-plugin-column1').append($option.clone());
      }
    }
  };

  const setCopyFromTable = function(res) {
    const relatedFields = res.properties;
    for (const rk in relatedFields) {
      if (!Object.prototype.hasOwnProperty.call(relatedFields, rk)) {
        continue;
      }
      const p = relatedFields[rk];
      const $option = $('<option>');
      switch (p.type) {
        case 'SUBTABLE':
          $option.attr('value', util.escapeHtml(p.code));
          $option.text(util.escapeHtml(p.code));
          $('.copyFromTable').append($option.clone());
          break;
        default:
          break;
      }
    }
  };
  return {dataClear, setChangeEventField, setCopyFromTable, setMappingField};
})(jQuery);

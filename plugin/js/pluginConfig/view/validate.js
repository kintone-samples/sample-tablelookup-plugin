import error from '../error';

jQuery.noConflict();

export default (function($) {
  'use strict';

  const checkLookupField = function(lookupFieldValue) {
    if (!lookupFieldValue) {
      throw new Error(error.createErrorMessage('lookup_field', '1'));
    }
  };

  const checkConfigCopyfieldVal = function(config) {
    const row_num = Number(config.table_row_number);

    for (let cf = 1; cf <= row_num; cf++) {
      const type2 = $(
        '#tc-plugin-copyfield-tbody > tr:eq(' + cf + ') .tc-plugin-column2 option:selected'
      ).attr('name');
      const type1 = $(
        '#tc-plugin-copyfield-tbody > tr:eq(' + cf + ') .tc-plugin-column1 option:selected'
      ).attr('name');
      const copy_field = JSON.parse(config['table_row' + cf]);
      if (copy_field.column1 !== '' && copy_field.column2 === '') {
        throw new Error(error.createErrorMessage('copy_field', '1', cf));
      }
      if (copy_field.column1 === '' && copy_field.column2 !== '') {
        throw new Error(error.createErrorMessage('copy_field', '2', cf));
      }
      if (copy_field.column1 !== '' && copy_field.column2 !== '' && type2 !== type1) {
        throw new Error(error.createErrorMessage('copy_field', '3', cf));
      }
    }
  };

  const checkCopyTableFields = function(config) {
    if (!config.copyToTable || !config.copyFromTable) {
      throw new Error(error.createErrorMessage('datasource_endpoint_fields', '1'));
    }
  }
  return {checkLookupField, checkConfigCopyfieldVal, checkCopyTableFields};
})(jQuery);

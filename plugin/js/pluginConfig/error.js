export default (function() {
  'use strict';

  const createErrorMessage = function(type, error_num, row_num) {
    const user_lang = kintone.getLoginUser().language;
    const error_messages = {
      ja: {
        lookup_field: {
          1: 'ルックアップフィールドは指定してください。',
        },
        datasource_endpoint_fields: {
          1: 'The Datasource table or Endpoint table field has not been set.',
        },
        copy_field: {
          1:
            '「コピーを行うテーブル内のフィールドの指定」の' +
            row_num +
            '行目のコピー先を指定してください。',
          2:
            '「コピーを行うテーブル内のフィールドの指定」の' +
            row_num +
            '行目のコピー元を指定してください。',
          3:
            '「コピーを行うテーブル内のフィールドの指定」の' +
            row_num +
            '行目のフィールドタイプが一致していません。指定しなおしてください。',
        },
      },
      en: {
        lookup_field: {
          1: 'The Lookup field has not been set.',
        },
        datasource_endpoint_fields: {
          1: 'The Datasource table or Endpoint table field has not been set.',
        },
        copy_field: {
          1: 'Set the Endpoint table field for row ' + row_num + ' of the Table Field Mappings.',
          2: 'Set the Datasource table field for row ' + row_num + ' of the Table Field Mappings.',
          3: 'The field types do not match for row ' + row_num + ' of the Table Field Mappings.',
        },
      },
      zh: {
        lookup_field: {
          1: 'lookup字段不能为空。',
        },
        datasource_endpoint_fields: {
          1: 'The Datasource table or Endpoint table field has not been set.',
        },
        copy_field: {
          1: '[设置要复制的字段]的第' + row_num + '行未指定复制目标字段。',
          2: '[设置要复制的字段]的第' + row_num + '行未指定复制来源字段。',
          3: '[设置要复制的字段]的第' + row_num + '行的字段类型不一致。请重新选择。',
        },
      },
    };
    return error_messages[user_lang][type][error_num];
  };
  return {createErrorMessage};
})();

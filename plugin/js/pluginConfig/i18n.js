export default (function() {
  'use strict';

  const i18n = {
    ja: {
      tc_lookup_label: 'ルックアップフィールドの指定',
      tc_lookup_description: 'コピー元のアプリと関連付けるルックアップフィールドを指定してください',
      tc_changeEvent_label: 'コピー元レコード番号',
      tc_changeEvent_description:
        '‘テーブルをコピーするには、ルックアップ設定画面の「ほかのフィールドのコピー」にコピー元のレコード番号を指定する必要があります。',
      tc_disable_label: '［オプション］編集可にしたいフィールドの指定',
      tc_disable_description:
        '通常、ルックアップ設定画面の「ほかのフィールドのコピー」に指定したコピー先フィールドは編集不可になります。',
      tc_disable_description2:
        'ここではそのフィールドを編集可に設定することができます。編集可にしたいフィールドを指定してください（複数選択可）。',
      tc_disable_field_title: 'フィールドコード',
      tc_tablefield_label: 'コピー元とコピー先の指定',
      tc_tablefield_description: 'コピー元テーブルとコピー先テーブルを指定してください。',
      tc_tablefield_from_title: 'コピー元テーブルのフィールドコード',
      tc_tablefield_to_title: 'コピー先テーブルのフィールドコード',
      tc_copyfield_description:
        'テーブル内でコピーしたいフィールドとコピー先のフィールドを指定してしてください（複数選択可）。',
      tc_copyfield_from_title: 'コピー元フィールド名',
      tc_copyfield_to_title: 'コピー先フィールド名',
      tc_submit: '保存',
      tc_cancel: 'キャンセル',
      tc_message: '必須項目です',
      tc_caution:
        '以下で選択肢を切り替えると、他の項目の設定もリセットされる場合があります。ご注意ください。',
      tc_message_changeEventfield:
        'ルックアップの「ほかのフィールドのコピー」にコピー元のレコード番号を指定する必要があります。フォームの設定をご確認ください',
    },
    en: {
      tc_lookup_label: 'The Lookup field',
      tc_lookup_description: 'Select a Lookup field to enhance.',
      tc_changeEvent_label: 'Editable fields',
      tc_changeEvent_description:
        'List the fields used in the Field Mappings option of the Lookup.' +
        ' These fields will become editable.',
      tc_disable_label: '[Option] Make fields editable',
      tc_disable_description:
        'List the fields used in the Field Mappings option of the Lookup.' +
        ' These fields will become editable.',
      tc_disable_field_title: 'Field Code',
      tc_tablefield_label: 'Table Lookup',
      tc_tablefield_description:
        'Choose which table in the Datasource App will be mapped to which table in this App.',
      tc_tablefield_from_title: 'Datasource table ',
      tc_tablefield_to_title: 'Endpoint table in this App',
      tc_copyfield_description:
        'Choose which fields in the Datasource table will be' +
        ' mapped to which fields in the table of this App.',
      tc_copyfield_from_title: 'Datasource table field',
      tc_copyfield_to_title: 'Endpoint table field',
      tc_submit: 'Save',
      tc_cancel: 'Cancel',
      tc_message: 'Required field',
      tc_caution: 'Note: Editing the below fields may cause other values on this page to reset.',
      tc_message_changeEventfield:
        'The Record number must be set as one of the mappings' +
        ' for the Field Mappings settings of the Lookup.',
    },
    zh: {
      tc_lookup_label: '选择lookup字段',
      tc_lookup_description: '请选择与复制来源的应用相关联的lookup字段',
      tc_changeEvent_label: '复制来源的记录编号字段',
      tc_changeEvent_description:
        '要复制表格，需要在lookup字段的设置页面的“其他要复制的字段”中指定复制来源的记录编号',
      tc_disable_label: '[可选项]设置字段可编辑',
      tc_disable_description:
        '在标准功能下，lookup设置页面的“其他要复制的字段”中设置的复制目标字段是不可编辑的。使用此项设置，可设为可编辑。',
      tc_disable_field_title: '字段代码',
      tc_tablefield_label: '指定复制的来源和目标位置',
      tc_tablefield_description: '请指定复制来源表格和复制目标表格。',
      tc_tablefield_from_title: '复制来源表格',
      tc_tablefield_to_title: '复制目标表格',
      tc_copyfield_description: '指定要从表格内的哪个字段复制到哪个字段。',
      tc_copyfield_from_title: '复制来源字段',
      tc_copyfield_to_title: '复制目标字段',
      tc_submit: '保存',
      tc_cancel: '取消',
      tc_message: '不能为空',
      tc_caution: '请注意！当更改此处的选项时，下面的项目中部分设置将被重置。',
      tc_message_changeEventfield:
        '需要在lookup的[其他要复制的字段]中指定复制来源的记录编号。请确认表单的设置',
    },
  };

  const getI18N = function(language) {
    return language in i18n ? i18n[language] : i18n.en;
  };
  return {getI18N};
})();

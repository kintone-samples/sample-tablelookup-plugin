import service from '../../service';
import common from './common';
import validate from './validate';
import lookupField from './lookupField';
import fromTableField from './fromTableField';
import toTableField from './toTableField';

export function getEvent($, config) {
  const thisAppId = common.getCurrentAppId();

  function alertshow(elmParent) {
    $(elmParent).parent().find('.common').css({display: 'block'});
  }

  function alerthide(elmParent) {
    $(elmParent).parent().find('.common').css({display: 'none'});
  }

  function binding() {
    // change lookup field
    $('.lookupField').change(() => {
      lookupField.dataClear();
      const elmParent = $('.lookupField').parent();
      const lookupFieldCode = $('.lookupField').val();
      if (lookupFieldCode === '') {
        alertshow(elmParent);
        $(elmParent).parent().find('#msg2').css({display: 'none'});
        return;
      }
      alerthide(elmParent);
      // set related table
      service.getFormFieldPreview(thisAppId).then((resp) => {
        const relateAppId =
          resp.properties[lookupFieldCode].lookup.relatedApp.app;
        lookupField.setChangeEventField(resp);
        lookupField.setMappingField(resp);
        // set related table fields
        return service.getFormFieldPreview(relateAppId).then((res) => {
          lookupField.setCopyFromTable(res);
        });
      });
    });

    // change related table
    $('.copyFromTable').change(() => {
      fromTableField.dataClear();
      const elmParent = $('.copyFromTable').parent();
      const related_table = $('.copyFromTable').val();
      if ($('.lookupField').val() === '') {
        return;
      }
      if (related_table === '') {
        alertshow(elmParent);
        return;
      }
      alerthide(elmParent);
      // set related fields
      service.getFormFieldPreview(thisAppId).then((resp) => {
        const lookupFieldCode = $('.lookupField').val();
        const relateAppId =
          resp.properties[lookupFieldCode].lookup.relatedApp.app;
        return service.getFormFieldPreview(relateAppId).then((res) => {
          fromTableField.setDropdown(res);
        });
      });
    });

    // change current table
    $('.copyToTable').change(() => {
      toTableField.dataClear();
      const elmParent = $('.copyToTable').parent();
      if ($('.copyToTable').val() === '') {
        alertshow(elmParent);
        return;
      }
      alerthide(elmParent);
      service.getFormFieldPreview(thisAppId).then((resp) => {
        toTableField.setDropdown(resp);
      });
    });

    // Add Row
    $('#tc-plugin-enablefield-tbody .addList').click((event) => {
      $('#tc-plugin-enablefield-tbody > tr')
        .eq(0)
        .clone(true)
        .insertAfter($(event.currentTarget).parent().parent());
      common.checkRowNumber();
    });

    $('#tc-plugin-copyfield-tbody .addList').click((event) => {
      $('#tc-plugin-copyfield-tbody > tr')
        .eq(0)
        .clone(true)
        .insertAfter($(event.currentTarget).parent().parent());
      common.checkRowNumber();
    });
    // Remove Row
    $('.removeList').click((event) => {
      $(event.currentTarget).parent('td').parent('tr').remove();
      common.checkRowNumber();
    });

    //  click Save
    $('#kintoneplugin-submit').click(() => {
      try {
        const newConfig = config.createConfig();
        validate.checkLookupField(newConfig.lookupField);
        validate.checkCopyTableFields(newConfig);
        validate.checkConfigCopyfieldVal(newConfig);
        kintone.plugin.app.setConfig(newConfig);
      } catch (error) {
        alert(error.message);
      }
    });

    // click Cancel
    $('#kintoneplugin-cancel').click(() => {
      history.back();
    });
  }
  return {binding};
}

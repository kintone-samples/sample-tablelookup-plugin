
(function() {
  'use strict';

  exports.getFormFieldPreview = function(appId) {
    return kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', {app: appId});
  };
  exports.getFormFields = function(body) {
    return kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', body);
  };

  exports.getRecord = function(body) {
    return kintone.api(kintone.api.url('/k/v1/record', true), 'GET', body);
  };
})();

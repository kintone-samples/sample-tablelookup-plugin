jQuery.noConflict();

export default (function($) {
  'use strict';

  const checkRowNumber = function() {
    if ($('#tc-plugin-enablefield-tbody > tr').length === 2) {
      $('#tc-plugin-enablefield-tbody > tr .removeList').eq(1).hide();
    } else {
      $('#tc-plugin-enablefield-tbody > tr .removeList').eq(1).show();
    }

    if ($('#tc-plugin-copyfield-tbody > tr').length === 2) {
      $('#tc-plugin-copyfield-tbody > tr .removeList').eq(1).hide();
    } else {
      $('#tc-plugin-copyfield-tbody > tr .removeList').eq(1).show();
    }
  };

  const getCurrentAppId = function() {
    return kintone.app.getId();
  };

  return {checkRowNumber, getCurrentAppId};
})(jQuery);

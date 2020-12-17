import I18N from '../i18n';
import {getInit} from './init';
import {getEvent} from './event';

export function getView($, config) {
  function initView() {
    $(document).ready(() => {
      renderView();

      const event = getEvent($, config);
      const init = getInit($, config);

      event.binding();
      init.setDropdownDefault();
    });
  }

  function renderView() {
    const language = kintone.getLoginUser().language;
    const i18n = I18N.getI18N(language);
    const configHtml = $('#tc-plugin').html();
    const tmpl = $.templates(configHtml);
    $('div#tc-plugin').html(tmpl.render({terms: i18n}));
  }

  return {initView};
}

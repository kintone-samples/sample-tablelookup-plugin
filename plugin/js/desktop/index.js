import {getConfig} from '../pluginConfig/config';
import {showEvents} from './view/show';
import {changeEvents} from './view/change';
jQuery.noConflict();

(function($, PLUGIN_ID) {
  const config = getConfig($, PLUGIN_ID);
  if (!config) {
    return;
  }

  config.parseEnableFieldRow();

  showEvents(config).binding();
  changeEvents(config).binding();
})(jQuery, kintone.$PLUGIN_ID);

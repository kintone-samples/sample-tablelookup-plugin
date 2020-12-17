import {getView} from './view';
import {getConfig} from './config';
jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';
  const config = getConfig($, PLUGIN_ID);
  if (!config) {
    return;
  }

  config.parseEnableFieldRow();

  const view = getView($, config);
  view.initView();
})(jQuery, kintone.$PLUGIN_ID);

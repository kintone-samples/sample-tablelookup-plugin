export default (function() {
  'use strict';

  // escape fields value
  function escapeHtml(htmlstr) {
    return htmlstr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  return {escapeHtml};
})();

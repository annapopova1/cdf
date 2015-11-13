/**
 * @module BaseFilter
 */

/**
 * Mixin that provides console logging abilities
 * @class Logger
 * @static
 * @extensionfor AbstractSelect
 * @extensionfor Models.Tree
 * @extensionfor Views.Abstract
 * @main
 */

define([
  'cdf/Logger'
], function (Logger) {
  return Logger;
});

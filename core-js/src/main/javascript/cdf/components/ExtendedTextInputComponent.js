/*!
 * Copyright 2017 Pentaho Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(["../lib/jquery", "./BaseComponent"], function($, BaseComponent) {

  return BaseComponent.extend({
    update: function() {
      var myself = this;

      myself._addHtmlToPlaceholder();

      var element = myself.placeholder().find("#" + myself.name);

      element.on("change", function() {
        if (myself.dashboard.getParameterValue(myself.parameter) !== element.val()) {
          myself.dashboard.processChange(myself.name);
        }
      }).on("keyup", function(ev) {
        if ((myself.refreshOnEveryKeyUp && myself.dashboard.getParameterValue(myself.parameter) !== element.val()) ||
          (ev.keyCode === 13 && myself.dashboard.getParameterValue(myself.parameter) !== element.val())) {
          myself.dashboard.processChange(myself.name);
        }
      });

      if (myself.addClearButton) {
        var elementButtonClear = myself.placeholder().find("#" + myself.name + "-btn-clear");
        elementButtonClear.click(function() {
          element.val("");
          myself._doAutoFocus();
          myself.dashboard.processChange(myself.name);
        });
      }

      myself._doAutoFocus();
      element.val(element.val());
    },

    getValue: function() {
      return $("#" + this.name).val();
    },

    _getInitialValue() {
      var val = this.dashboard.getParameterValue(this.parameter);
      if (!val || val === "null") {
        val = "";
      }
      return val;
    },

    _addHtmlToPlaceholder: function() {
      var componentHTML = "<input" +
        " type='text'" +
        " id='" + this.name + "'" +
        " name='" + this.name + "'" +
        " value='" + this._getInitialValue() + "'>";
      if (this.addClearButton) {
        componentHTML += "<button id='" + this.name + "-btn-clear' class='" + this.clearButtonCssClass + "'></button>";
      }
      this.placeholder().html(componentHTML);
    }
  });
});

/*!
 * Copyright 2002 - 2017 Webdetails, a Pentaho company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define([
  "../lib/jquery",
  "./BaseComponent",
  "../Logger"
], function($, BaseComponent, Logger) {

  return BaseComponent.extend({
    update: function() {
      var myself = this;

      myself._addHtmlToPlaceholder();

      var el = $("#" + myself.name);

      el.change(function() {
        if(myself._isValueChanged(el)) {
          myself.dashboard.processChange(myself.name);
        }
      }).keyup(function(ev) {
        if((myself.refreshOnEveryKeyUp || ev.keyCode === 13) && myself._isValueChanged(el)) {
          myself.cursorPlace = el[0].selectionStart;
          myself.dashboard.processChange(myself.name);
        }
      });

      if(myself.addClearIcon) {
        $("#" + myself.name + "-clear-icon").click(function() {
          el.val("");
          myself.dashboard.processChange(myself.name);
        });
      }

      myself._doAutoFocus();

      if (myself.refreshOnEveryKeyUp) {
        // Asynchronously reset focus in the same place
        setTimeout(function(){
          /*el.focus();
          var $curValue = el.val();
          el.val('').val($curValue);*/
          setCursor(el[0], myself.cursorPlace);
        }, 0);
      }
    },

    getValue: function() {
      return $("#" + this.name).val();
    },

    _addHtmlToPlaceholder: function() {
      var componentHTML = "<input" +
        " type='text'" +
        " id='" + this.name + "'" +
        " name='" + this.name + "'" +
        " value='" + this.dashboard.getParameterValue(this.parameter) +
        (this.size ? ("' size='" + this.size) : (this.charWidth ? ("' size='" + this.charWidth) : "")) +
        (this.maxLength ? ("' maxlength='" + this.maxLength) : (this.maxChars ? ("' maxlength='" + this.maxChars) : "")) + "'>";
      if(this.addClearIcon) {
        var className = "clear-icon" + (this.clearIconClassName ? " " + this.clearIconClassName : "");
        componentHTML += "<div id='" + this.name + "-clear-icon' class='" + className + "'></div>";
      }
      if(this.size) {
        Logger.warn("Attribute 'size' is deprecated");
      }
      if(this.maxLength) {
        Logger.warn("Attribute 'maxLength' is deprecated");
      }
      this.placeholder().html(componentHTML);
    },

    _isValueChanged: function(element) {
      return this.dashboard.getParameterValue(this.parameter) !== element.val();
    },

    _setCursor: function(node, pos){
      if(!node){
        return false;
      }else if(node.createTextRange){
        var textRange = node.createTextRange();
        textRange.collapse(true);
        textRange.moveEnd("character", pos);
        textRange.moveStart("character", pos);
        textRange.select();
        return true;
      }else if(node.setSelectionRange){
        node.setSelectionRange(pos,pos);
        return true;
      }
      return false;
    }
  });

});

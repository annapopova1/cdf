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

define([
  "cdf/Dashboard.Clean",
  "cdf/components/ExtendedTextInputComponent"
], function(DashboextendedTrd, ExtendedTextInputComponent) {

  /**
   * ## The Extended Text Input Component
   */
  describe("The Extended Text Input Component #", function() {

    var dashboard = new Dashboard();
    
    dashboard.addParameter("input", "");

    dashboard.init();

    var extendedTextInputComponent = new ExtendedTextInputComponent({
      name: "extendedTextInputComponent",
      type: "extendedTextInputComponent",
      parameters: [],
      parameter: "input",
      htmlObject: "sampleObjectTextInput",
      executeAtStart: true,
      postChange: function() {
        return "you typed: " + this.dashboard.getParameterValue(this.parameter);
      }
    });

    dashboard.addComponent(extendedTextInputComponent);

    /**
     * ## The Extended Text Input Component # allows a dashboard to execute update
     */
    it("allows a dashboard to execute update", function(done) {
      spyOn(extendedTextInputComponent, 'update').and.callThrough();

      // listen to cdf:postExecution event
      extendedTextInputComponent.once("cdf:postExecution", function() {
        expect(extendedTextInputComponent.update).toHaveBeenCalled();
        done();
      });

      dashboard.update(extendedTextInputComponent);
    });
  });
});

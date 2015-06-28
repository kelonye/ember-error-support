/**
 * Module dependencies
 */
require('ember');

// expose

module.exports = Em.Mixin.create({
  
  isValid: true,

  error: undefined,

  classNameBindings: ['isValid::error'],

  didInsertElement: function() {
    this._super();
    var that = this;
    var _for = this.get('for');
    var context = this.get('context');
    var key = '_errors.' + _for;
    context.addObserver(key, function() {
      var error = context.get(key);
      var isValid = error == undefined;
      that.setProperties({
        error: error,
        isValid: isValid
      });
    });
  },

  willDestroyElement: function() {
    var _for = this.get('for');
    var key = '_errors.' + _for;
    var context = this.get('context');
    context.removeObserver(key);
  }

});

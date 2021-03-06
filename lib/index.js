/**
 * Module dependencies
 */
require('ember');

// expose

module.exports = Em.Mixin.create({

  classNameBindings: ['isValid::error'],
  
  isValid: function(){
    var err = this.get('error');
    return !('' === err || !!err);
  }.property('error'),

  setupOnBlur: function(){
    var model = this.get('model');
    if (!(model && model.validate)) return;
    this.$().on('blur', model.validate.bind(model, null));
    // this.$().on('focus', model.validate.bind(model, null));
  }.on('didInsertElement'),

});

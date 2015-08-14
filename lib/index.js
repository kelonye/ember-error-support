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

  setup: function(){
    var model = this.get('model');
    if (!(model && model.validate)) return;
    this.$().on('blur', model.validate.bind(model));
    // this.$().on('focus', model.validate.bind(model));
  }.on('didInsertElement'),

});

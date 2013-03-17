// Generated by CoffeeScript 1.6.1
var get, set;

get = Em.get;

set = Em.set;

module.exports = Em.Mixin.create({
  isValid: true,
  error: void 0,
  classNameBindings: ['isValid::error'],
  didInsertElement: function() {
    var context, key, that, _for;
    this._super();
    that = this;
    _for = get(this, 'for');
    context = get(this, 'context');
    key = "_errors." + _for;
    return context.addObserver(key, function() {
      var error, isValid;
      error = get(context, key);
      isValid = error === void 0;
      return that.setProperties({
        error: error,
        isValid: isValid
      });
    });
  },
  willDestroyElement: function() {
    var context, _for;
    _for = get(this, 'for');
    context = get(this, 'context');
    return context.removeObserver("_errors." + _for);
  }
});
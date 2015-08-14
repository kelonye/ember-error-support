var person;
var textField;

var Person = Em.Object.extend(ValidateMixin, {
  validations: {
    email: ['presence', 'email']
  }
});

describe('Error Support:', function() {
  beforeEach(function() {
    person = Person.create({
      email: null
    });
    Em.TextSupport.reopen(require('ember-error-support'));
    textField = Em.TextField.create({
      errorBinding: 'model._errors.email',
      valueBinding: 'model.email',
    });
    Em.run(function() {
      textField.append();
    });
  });
  afterEach(function() {
    person.destroy();
    textField.destroy();
  });
  it("input's @error==undefined and @isValid==true", function() {
    assert.equal(textField.get('value'), null);
    assert.equal(textField.get('error'), undefined);
    assert.equal(textField.get('isValid'), true);
    assert.equal(textField.$().hasClass('error'), false);
  });
  it('inputs have .error class when value becomes inValid', function() {
    person.validate(function(){
      assert.equal(textField.get('value'), null);
      assert.equal(textField.get('error'), '');
      assert.equal(textField.get('isValid'), false);
      assert.equal(textField.$().hasClass('error'), true);
      person.set('email', 'g');
      person.validate(function(){
        assert.equal(textField.get('value'), 'g');
        assert.equal(textField.get('error'), '¬ wrong email format');
        assert.equal(textField.get('isValid'), false);
        assert.equal(textField.$().hasClass('error'), true);
      });
    });
  });
  it('inputs value is ok', function() {
    person.set('email', 'g@g.g');
    person.validate(function(){
      assert.equal(textField.get('value'), 'g@g.g');
      assert.equal(textField.get('error'), undefined);
      assert.equal(textField.get('isValid'), true);
      assert.equal(textField.$().hasClass('error'), false);
    });
  });
});

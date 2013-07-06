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
      email: ''
    });
    Em.TextSupport.reopen(require('ember-error-support'));
    textField = Em.TextField.create({
      'for': 'email',
      valueBinding: 'context.email',
      context: person
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
    assert.equal(textField.get('value'), '');
    assert.equal(textField.get('error'), undefined);
    assert.equal(textField.get('isValid'), true);
    assert.equal(textField.$().hasClass('error'), false);
  });
  it('inputs have .error class when value becomes inValid', function() {
    Em.run(function() {
      person.validate();
    });
    assert.equal(textField.get('value'), '');
    assert.equal(textField.get('error'), '');
    assert.equal(textField.get('isValid'), false);
    assert.equal(textField.$().hasClass('error'), true);
    Em.run(function() {
      person.set('email', 'g');
      person.validate();
    });
    assert.equal(textField.get('value'), 'g');
    assert.equal(textField.get('error'), '¬ wrong email format');
    assert.equal(textField.get('isValid'), false);
    assert.equal(textField.$().hasClass('error'), true);
  });
  it('inputs value is ok', function() {
    Em.run(function() {
      person.set('email', 'g@g.g');
      person.validate();
    });
    assert.equal(textField.get('value'), 'g@g.g');
    assert.equal(textField.get('error'), undefined);
    assert.equal(textField.get('isValid'), true);
    assert.equal(textField.$().hasClass('error'), false);
  });
});

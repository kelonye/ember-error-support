get = Em.get
set = Em.set

Person = person = textField = undefined

describe 'Error Support:', ->

  beforeEach ->

    Person = Em.Object.extend ValidateMixin,
      validations:
        email:[
          'presence'
          'email'
        ]

    person = Person.create
      email: ''

    Em.TextSupport.reopen require 'ember-error-support'

    textField = Em.TextField.create
      for: 'email'
      valueBinding: 'context.email'
      context: person
    
    Em.run ->
      textField.append()

  afterEach ->
    person.destroy()
    textField.destroy()
  
  it "input's @error==undefined and @isValid==true", ->
    assert.equal get( textField, 'value' ), ''
    assert.equal get( textField, 'error' ), undefined
    assert.equal get( textField, 'isValid' ), true
    assert.equal textField.$().hasClass('error'), false

  it 'inputs have .error class when value becomes inValid', ->
    person.validate()
    assert.equal get( textField,'value' ), ''
    assert.equal get( textField, 'error' ), ''
    assert.equal get( textField, 'isValid' ), false
    assert.equal textField.$().hasClass('error'), true

    Em.run ->
      set person, 'email', 'g'
      person.validate()
    
    assert.equal get( textField,'value' ), 'g'
    assert.equal get( textField, 'error' ), '¬ wrong email format'
    assert.equal get( textField, 'isValid' ), false
    assert.equal textField.$().hasClass('error'), true

  it 'inputs value is ok', ->
    Em.run ->
      set person, 'email', 'g@g.g'
      person.validate()

    assert.equal get( textField,'value' ), 'g@g.g'
    assert.equal get( textField, 'error' ), undefined
    assert.equal get( textField, 'isValid' ), true
    assert.equal textField.$().hasClass('error'), false

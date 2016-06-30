(function() {
  'use strict';

  function fixWhitespace(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  /* global require */
  const addMessageItem = require('exercise/add-message-item');

  QUnit.module('Add Message Item');

  test('it adds a new message item element to a list element', (assert) => {
    const list = document.createElement('ul');
    const messageOne = { username: 'Ryan', message: 'Do your homework' };
    const messageTwo = { username: 'Josh', message: 'Time for standups' };

    // Typeof checks that something is a function, number, etc
    assert.equal(typeof addMessageItem, 'function',
      'The add message item module should export a function');
    // function lengths returns a number of arguments the function accepts
    assert.equal(addMessageItem.length, 2,
      'addMessageItem should take two arguments, a list element and an object of data');

    addMessageItem(list, messageOne);
    addMessageItem(list, messageTwo);

    // Looks that the two messages have been added to the list
    const resultOne = list.querySelector('li');
    const resultTwo = list.querySelector('li:last-of-type');

    // Element tag names are uppercase when looked up
    assert.equal(resultOne.tagName, 'LI',
      'createMessageItem should return an `LI` element');

    // Uses the fixWhitespace helper to remove repeating whitespace
    // so you can format your HTML better
    assert.equal(fixWhitespace(resultOne.innerText), 'Ryan Do your homework',
      'createMessageItem should fill in the required data for messageOne');
    assert.equal(fixWhitespace(resultTwo.innerText), 'Josh Time for standups',
      'createMessageItem should fill in the required data for messageTwo');
  });
})();

(function() {
  'use strict';

  function fixWhitespace(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  /* global require */
  const createMessageItem = require('exercise/create-message-item');

  QUnit.module('Create Message Item');

  test('make qunit happy', (assert) => {
    assert.ok(true);
  });

  test('it creates a new message item element', (assert) => {
    const messageOne = { username: 'Ryan', message: 'Do your homework' };
    const messageTwo = { username: 'Josh', message: 'Time for standups' };

    const resultOne = createMessageItem(messageOne);
    const resultTwo = createMessageItem(messageTwo);

    // Element tag names are uppercase when looked up
    assert.equal(resultOne.tagName, 'LI', 'createMessageItem should return an `LI` element');

    // Uses the fixWhitespace helper to remove repeating whitespace
    // so you can format your HTML better
    assert.equal(fixWhitespace(resultOne.innerText), 'Ryan Do your homework',
      'createMessageItem should fill in the required data for messageOne');
    assert.equal(fixWhitespace(resultTwo.innerText), 'Josh Time for standups',
      'createMessageItem should fill in the required data for messageTwo');

    const nameOne = fixWhitespace(resultOne.querySelector('.message-item__username').innerText);
    const nameTwo = fixWhitespace(resultTwo.querySelector('.message-item__username').innerText);

    assert.equal(nameOne, 'Ryan',
      'createMessageItem should create a ".message-item__username" span filled with the username for messageOne');
    assert.equal(nameTwo, 'Josh',
      'createMessageItem should create a ".message-item__username" span filled with the username for messageTwo');
  });
})();

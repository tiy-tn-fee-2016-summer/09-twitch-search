(function() {
  'use strict';

  /* global require */
  const reverseList = require('exercise/reverse-list');

  QUnit.module('Copy in reverse');

  test('it reverses the items within an element', (assert) => {
    const listOne = document.createElement('ul');
    const listTwo = document.createElement('ul');
    const outputOne = document.createElement('ul');
    const outputTwo = document.createElement('ul');

    listOne.innerHTML = '<li>1</li><li>5</li>';
    listTwo.innerHTML = '<li>200</li><li>50</li><li>190</li>';

    reverseList(listOne, outputOne);
    reverseList(listTwo, outputTwo);

    assert.equal(listOne.children.length, 2);
    assert.equal(listTwo.children.length, 3);

    assert.equal(outputOne.children.length, 2);
    assert.equal(outputOne.children[0].innerText, 5);
    assert.equal(outputOne.children[1].innerText, 1);

    assert.equal(outputTwo.children.length, 3);
    assert.equal(outputTwo.children[0].innerText, 190);
    assert.equal(outputTwo.children[1].innerText, 50);
    assert.equal(outputTwo.children[2].innerText, 200);
  });
})();

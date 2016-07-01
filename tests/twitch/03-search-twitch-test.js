(function() {
  /* global require */
  QUnit.module('Twitch Game Page');

  const itemOne = {
    name: 'StarCraft II',
    popularity: 2619,
    _id: 490422,
    giantbomb_id: 0,
    box: {
      large: 'https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-272x380.jpg',
      medium: 'https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-136x190.jpg',
      small: 'https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-52x72.jpg',
      template: 'https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-{width}x{height}.jpg',
    },
    logo: {
      large: 'https://static-cdn.jtvnw.net/ttv-logoart/StarCraft%20II-240x144.jpg',
      medium: 'https://static-cdn.jtvnw.net/ttv-logoart/StarCraft%20II-120x72.jpg',
      small: 'https://static-cdn.jtvnw.net/ttv-logoart/StarCraft%20II-60x36.jpg',
      template: 'https://static-cdn.jtvnw.net/ttv-logoart/StarCraft%20II-{width}x{height}.jpg',
    },
    _links: {},
  };

  const itemTwo = {
    name: 'Starbound',
    popularity: 1226,
    _id: 33945,
    giantbomb_id: 37839,
    box: {
      large: 'https://static-cdn.jtvnw.net/ttv-boxart/Starbound-272x380.jpg',
      medium: 'https://static-cdn.jtvnw.net/ttv-boxart/Starbound-136x190.jpg',
      small: 'https://static-cdn.jtvnw.net/ttv-boxart/Starbound-52x72.jpg',
      template: 'https://static-cdn.jtvnw.net/ttv-boxart/Starbound-{width}x{height}.jpg',
    },
    logo: {
      large: 'https://static-cdn.jtvnw.net/ttv-logoart/Starbound-240x144.jpg',
      medium: 'https://static-cdn.jtvnw.net/ttv-logoart/Starbound-120x72.jpg',
      small: 'https://static-cdn.jtvnw.net/ttv-logoart/Starbound-60x36.jpg',
      template: 'https://static-cdn.jtvnw.net/ttv-logoart/Starbound-{width}x{height}.jpg',
    },
    _links: {},
  };

  function testUiForItem(el, item, assert, msgPrefix) {
    assert.ok(el instanceof Element,
      `${msgPrefix}: The game item should be an Element object
        (see document.createElement)`);
    assert.ok(el.classList.contains('game-item'),
      `${msgPrefix}: The game item element element should have a class 'game-item'`);

    // Check the game name
    const name = el.querySelector('h3.game-item__name');
    assert.ok(name,
      `${msgPrefix}: The game item contains an element with the class 'game-item__name'`);
    assert.equal(name.innerText.trim(), item.name,
      `${msgPrefix}: The game item name contains the game item's name from the data`);

    // Check the game name
    const gameName = el.querySelector('h4.game-item__popularity');
    assert.ok(gameName,
      `${msgPrefix}: The game item contains an element with the class 'game-item__popularity'`);
    assert.equal(gameName.innerText.trim(), item.popularity,
      `${msgPrefix}: The game item popularity contains the game item's game name from the data`);

    // Check game item picture
    const pic = el.querySelector('img.game-item__pic');
    assert.ok(pic,
      `${msgPrefix}: The game item contains an 'img' element with the class 'game-item__pic'`);
    assert.equal(pic.getAttribute('src'), item.box.large,
      `${msgPrefix}: The game item pic has an src from the first Image url`);
    assert.equal(pic.getAttribute('alt'), item.name,
      `${msgPrefix}: The game item pic has an alt from the game item's name`);
  }

  // Fakes twitch data so tests run fast!
  function fakeData(searchTerm) {
    return new Promise((resolve) => {
      if (searchTerm === 'starcraft') {
        resolve([itemOne]);
      } else {
        resolve([itemTwo]);
      }
    });
  }

  const searchTwitch = require('twitch/search-twitch');

  test('it can search for a set of data', (assert) => {
    // Tell tests that things here will be async
    const done = assert.async();

    const gameListElement = document.createElement('div');

    // Wait for searchEtsy to finish it's promise
    //   since 'fakeData' is async
    searchTwitch(gameListElement, 'starbound', fakeData).then(() => {
      const gameItemOne = gameListElement.querySelector('.game-item');

      testUiForItem(gameItemOne, itemTwo, assert,
        'Starbound result');

      // Wait for searchEtsy to finish it's promise
      //   since 'fakeData' is async
      return searchTwitch(gameListElement, 'starcraft', fakeData);
    }).then(() => {
      const cageOne = gameListElement.querySelector('.game-item');

      testUiForItem(cageOne, itemOne, assert,
        'Starcraft result');

      done();
    });
  });
})();

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

  const showGamesInList = require('twitch/add-games-to-list');

  test('it can add games to the list of games', (assert) => {
    const parentEl = document.createElement('div');

    showGamesInList(parentEl, [itemOne, itemTwo]);

    const gameItemOne = parentEl.querySelector('.game-item');
    const gameItemTwo = parentEl.querySelector('.game-item:last-of-type');

    testUiForItem(gameItemOne, itemOne, assert,
      'Result of showAllResults for itemOne');

    testUiForItem(gameItemTwo, itemTwo, assert,
      'Result of showAllResults for itemOne');

    showGamesInList(parentEl, [itemTwo]);

    const gameItemReset = parentEl.querySelector('.game-item');

    testUiForItem(gameItemReset, itemTwo, assert,
      'showGamesInList should empty the element before adding items');
  });
})();

export default function (term) {
  return fetch(`https://api.twitch.tv/kraken/search/games?q=${term}&type=suggest`)
    .then((res) => res.json())
    .then((response) => response.games);
}

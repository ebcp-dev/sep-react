function getAlbums(e) {
  e.preventDefault();

  const searchQuery = document.getElementById('searchQuery').value;

  const searchUrl = `https://itunes.apple.com/search?term=${searchQuery}&media=music&entity=album&attribute=artistTerm&limit=50`;

  fetchJsonp(`${searchUrl}`)
    .then((response) => {
      return response.json();
    })
    .then(json => {
      console.log(json)
      displayCounter(json.resultCount, searchQuery)
      listAlbums(json.results)
    })
    .catch(error => {
      return error;
    });
}

function displayCounter(count, query) {
  let counter = document.getElementById('result_counter');
  counter.innerHTML = query.length < 1 ? 'must enter artist name' : `${count} results for "${query}"`;
}

function listAlbums(albumsArr) {
  albumsArr.forEach(function (item) {
    let albumCard = document.createElement('article');
    albumCard.classList.add('album-card');

    let albumImg = document.createElement('img');
    albumImg.classList.add('album-cover');
    albumImg.src = item.artworkUrl60;

    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    let cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = item.collectionName;

    cardContainer.appendChild(cardTitle);

    albumCard.appendChild(albumImg);
    albumCard.appendChild(cardContainer);

    document.getElementById('albums-list').appendChild(albumCard);
  })
}

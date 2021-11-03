function getAlbums(e) {
  e.preventDefault();

  const searchQuery = document.getElementById('searchQuery').value;

  const searchUrl = `https://itunes.apple.com/search?term=${searchQuery}&media=music&entity=album&attribute=artistTerm&limit=200`;

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
  let results = document.getElementById('albums-list');

  results.innerHTML = '';
  albumsArr.forEach(function (item) {
    let albumCard = `
    <article class="album-card" id="${item.collectionId}">
      <img class="album-cover" src="${item.artworkUrl60}">
      <div class="card-container">
        <h6 class="card-title">${item.collectionName}</h6>
      </div>
    </article>
    `;
    
    results.insertAdjacentHTML('beforeend', albumCard);

    document.getElementById(`${item.collectionId}`).onclick = () => {
      let myWindow = window.open("Release date", "MsgWindow", "width=200, height=200");

      myWindow.document.write(`
        <p>This album was released on: ${item.releaseDate}</p>
        <button id="btn-close">Close window</button>
      `)
      
      myWindow.document.getElementById('btn-close').addEventListener('click', () => {
        myWindow.close();
      });
    }
  })
}

function releaseDateWindow(releaseDate) {
  let myWindow = window.open("Release date", "MsgWindow", "width=200, height=200");

  myWindow.document.write(`
    <p>This album was released on: ${releaseDate}</p>
    <button id="btn-close">Close window</button>
  `)
  
  myWindow.document.getElementById('btn-close').addEventListener('click', () => {
    myWindow.close();
  });
}

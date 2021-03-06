function getAlbums(e) {
  e.preventDefault();

  const searchQuery = document.getElementById('searchQuery').value;

  const searchUrl = `https://itunes.apple.com/search?term=${searchQuery}&media=music&entity=album&attribute=artistTerm&limit=200`;

  fetchJsonp(`${searchUrl}`)
    .then((response) => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      displayCounter(json.resultCount, searchQuery);
      listAlbums(json.results);
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
  let albumsList = document.getElementById('albumsList');
  albumsList.innerHTML = '';
  albumsArr.forEach((item) => {
    let albumCard = `
    <article class="album-card" id="${item.collectionId}">
      <img class="album-cover" src="${item.artworkUrl60}">
      <h6 class="card-title">${item.collectionName}</h6>
    </article>
    `;
    
    albumsList.insertAdjacentHTML('beforeend', albumCard);

    document.getElementById(`${item.collectionId}`).onclick = () => {
      let myWindow = window.open("Release date", "MsgWindow", "width=400, height=400");

      let releaseDate = new Date(item.releaseDate);
      let releaseMonth = releaseDate.toLocaleString('default', { month: 'long' })

      myWindow.document.write(`
        <head>
        <title>${item.collectionName}</title>
        </head>
        <p>ID: ${item.collectionId}</p>
        <p>Artist: ${item.artistName}</p>
        <p>This album was released on: ${releaseMonth} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}</p>
        <button id="btn-close">Close window</button>
      `);
      
      myWindow.document.getElementById('btn-close').onclick = () => {
        myWindow.close();
      };
    }
  });
}

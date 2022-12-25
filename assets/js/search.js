// Credits to search implementation: https://gist.github.com/cmod/5410eae147e4318164258742dd053993

var fuse; // holds our search engine
var searchVisible = false;
var firstRun = true; // allow us to delay loading json data unless search activated
var list = document.querySelector('.search-list'); // targets the <ul>
var first = list.firstChild; // first child of search list
var last = list.lastChild; // last child of search list
var maininput = document.querySelector('.search-ui input'); // input box for search
var searchResultsHeading = document.querySelector('.search-results'); // input box for search
var noResults = document.querySelector('.no-results'); // input box for search
var resultsAvailable = false; // Did we get any search results?

// ==========================================
// The main keyboard event listener running the show
//
document.querySelector('.open-search').addEventListener('click', openSearch);
document.querySelector('.close-search').addEventListener('click', closeSearch);

function closeSearch() {
  document.querySelector('.search-ui').classList.add("hidden");
  document.activeElement.blur(); // remove focus from search box 
  searchVisible = false; // search not visible
  searchResultsHeading.classList.add('hidden');
}

function openSearch() {
  // Load json search index if first time invoking search
  // Means we don't load json unless searches are going to happen; keep user payload small unless needed
  if (firstRun) {
    loadSearch(); // loads our json data and builds fuse.js search index
    firstRun = false; // let's never do this again
  }

  //Close the mobile menu when search is click.
  mobileMenu.classList.toggle('hidden');

  // Toggle visibility of search box
  if (!searchVisible) {
    document.querySelector('.search-ui').classList.remove("hidden");
    document.querySelector('.search-ui input').focus(); // put focus in input box so you can just start typing
    searchVisible = true; // search visible
  }
}

document.addEventListener('keydown', function (event) {

  if (event.metaKey && event.which === 191) {
    openSearch()
  }

  // Allow ESC (27) to close search box
  if (event.keyCode == 27) {
    if (searchVisible) {
      document.querySelector('.search-ui').classList.add("hidden");
      document.activeElement.blur();
      searchVisible = false;
      searchResultsHeading.classList.add('hidden');
    }
  }

  // DOWN (40) arrow
  if (event.keyCode == 40) {
    if (searchVisible && resultsAvailable) {
      console.log("down");
      event.preventDefault(); // stop window from scrolling
      if (document.activeElement == maininput) { first.focus(); } // if the currently focused element is the main input --> focus the first <li>
      else if (document.activeElement == last) { last.focus(); } // if we're at the bottom, stay there
      else { document.activeElement.parentElement.nextSibling.firstElementChild.focus(); } // otherwise select the next search result
    }
  }

  // UP (38) arrow
  if (event.keyCode == 38) {
    if (searchVisible && resultsAvailable) {
      event.preventDefault(); // stop window from scrolling
      if (document.activeElement == maininput) { maininput.focus(); } // If we're in the input box, do nothing
      else if (document.activeElement == first) { maininput.focus(); } // If we're at the first item, go to input box
      else { document.activeElement.parentElement.previousSibling.firstElementChild.focus(); } // Otherwise, select the search result above the current active one
    }
  }
})


// ==========================================
// execute search as each character is typed
//
document.querySelector('.search-ui input').onkeyup = function (e) {
  executeSearch(this.value);
}


// ==========================================
// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}


// ==========================================
// load our search index, only executed once
// on first call of search box (CMD-/)
//
function loadSearch() {
  const lang = document.querySelector('head > meta[name="lang"]')?.getAttribute?.('content')
  fetchJSONFile(`${lang ? "/" + lang : ""}/index.json`, function (data) {

    var options = { // fuse.js options; check fuse.js website for details
      shouldSort: true,
      location: 0,
      distance: 100,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: [
        'title',
        'permalink',
        'contents'
      ]
    };
    fuse = new Fuse(data, options); // build the index from the json file
  });
}


// ==========================================
// using the index we loaded on CMD-/, run 
// a search query (for "term") every time a letter is typed
// in the search box
//
function executeSearch(term) {
  let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ''; // our results bucket

  if (results.length === 0) { // no results based on what was typed into the input box
    resultsAvailable = false;
    searchitems = '';
    if (term !== "") {
      noResults.classList.remove('hidden')
    } else {
      noResults.classList.add('hidden')
    }
  } else { // build our html 
    noResults.classList.add('hidden')
    if (term !== "") {
      searchResultsHeading.classList.remove('hidden');
    }

    for (let item in results.slice(0, 5)) { // only show first 5 results
      const title = '<div class="text-2xl mb-2 font-bold">' + results[item].item.title + '</div>';
      const date = results[item].item.date ? '<div><em class="px-4">' + new Date(results[item].item.date).toUTCString().substring(0, 16) + '</em></div>' : '';
      const contents = '<div class="prose px-4">' + results[item].item.contents + '</div>';

      searchitems = searchitems + '<li><a class="block mb-2 px-4 py-2 rounded pb-2 border-b border-gray-200 dark:border-gray-600 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none" href="' + results[item].item.permalink + '" tabindex="0">' + title + '</a>' + date + contents + '</li>';
    }
    resultsAvailable = true;
  }

  list.innerHTML = searchitems;
  if (results.length > 0) {
    first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
    last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
  }
}

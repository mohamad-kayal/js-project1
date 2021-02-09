import {getGithubRepoSearchUrl} from './connection.js';
import {appendRepo} from './domHandler.js';

let searchInput;
let listElement;
let loadingElement; 
let errorElement;
let showingResultFor;
let searchForm;

window.onload = () => {
  searchInput = document.querySelector('#input');
  listElement = document.querySelector('#response');
  loadingElement = document.querySelector('#loading');
  errorElement = document.querySelector('#error');
  showingResultFor = document.querySelector('#showingResultsFor');
  searchForm = document.querySelector('#form');
};



function searchRepos(query, startCallback, callback) {
  if (startCallback) {
    startCallback();
  }

  const response = fetch(getGithubRepoSearchUrl(query))
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(() => {
      toggleError(
        true,
        'Sorry, something went wrong, please, try again later.'
      );
    })
    .finally(() => {
      searchForm.reset();
    });
  return false;
}

// combining the onClick with the form
function makeSearch() {
  if (errorElement.innerText != '') {
    toggleError();
  }
  searchRepos(
    searchInput.value,
    () => {
      toggleLoading(true);
      clearList();
    },
    ({ items }) => {
      toggleShowingResults(true, searchInput.value);
      toggleLoading();
      items.forEach((item) => appendRepo(item));
    }
  );
}
window.makeSearch=makeSearch;

function toggleShowingResults(show = false, searchInput = ' ') {
  showingResultFor.style.display = show ? 'block' : 'none';
  showingResultFor.innerText = `Showing Results for: ${searchInput}`;
}

const toggleLoading = (show = false) => {
  loadingElement.style.display = show ? 'block' : 'none';
};
const toggleError = (show = false, errorMessage) => {
  toggleShowingResults();
  toggleLoading();
  errorElement.innerText = errorMessage;
  errorElement.style.display = show ? 'block' : 'none';
};

function clearList() {
  listElement.innerHTML = '';
}

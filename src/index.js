

const GITHUB_API_URL = 'https://api.github.com';
function getGithubRepoSearchUrl(query) {
  return `${GITHUB_API_URL}/search/repositories?q=${query}&page=1&per_page=10`;
}


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

const toggleLoading = (show = false) => {
  loadingElement.style.display = show ? 'block' : 'none';
};
const toggleError = (show = false, errorMessage) => {
  toggleShowingResults();
  toggleLoading();
  errorElement.innerText = errorMessage;
  errorElement.style.display = show ? 'block' : 'none';
};


const appendRepo = ({
  owner: { html_url: url },
  owner: { avatar_url },
  full_name: fullName,
  html_url: htmlUrl,
  description,
}) => {
  const repoElement = document.createElement('li');
  const userPersonalPic = document.createElement('img');

  userPersonalPic.src = avatar_url;
  repoElement.appendChild(userPersonalPic);

  const repoDescElement = document.createElement('h3');
  repoDescElement.innerText = description;
  repoElement.appendChild(repoDescElement);

  const repoNameElement = document.createElement('p');
  repoNameElement.innerText = fullName;
  repoElement.appendChild(repoNameElement);

  const repoUserUrlElem = document.createElement('a');
  repoUserUrlElem.href = url;
  repoUserUrlElem.innerText = 'User Profile';
  repoElement.appendChild(repoUserUrlElem);

  repoElement.appendChild(document.createElement('br'));

  const repoUrlElem = document.createElement('a');
  repoUrlElem.href = htmlUrl;
  repoUrlElem.innerText = "Repository's home page";
  repoElement.appendChild(repoUrlElem);
  listElement.appendChild(repoElement);
};

window.makeSearch = makeSearch;
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

function toggleShowingResults(show = false, searchInput = ' ') {
  showingResultFor.style.display = show ? 'block' : 'none';
  showingResultFor.innerText = `Showing Results for: ${searchInput}`;
}

function clearList() {
  listElement.innerHTML = '';
}


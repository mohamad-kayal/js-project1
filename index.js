const GITHUB_API_URL = 'https://api.github.com';

function getGithubRepoSearchUrl(query) {
  return `${GITHUB_API_URL}/search/repositories?q=${query}&page=1&per_page=10`;
}

function doRequest(url, requestInfo = { method: 'GET' }) {
  const { method, body, startCB, callback, endCB } = requestInfo;

  if (startCB) {
    startCB();
  }

  fetch(url, { method: method.toUpperCase(), body: JSON.stringify(body) })
    .then(res => {
      if (callback) {
        callback(null, res.json());
      }
    })
    .catch(err => {
      if (callback) {
        callback(err);
      }
    })
    .finally(() => {
      if (endCB) {
        endCB();
      }
    });
}

function searchRepos(query, startCB, callback, endCB) {
  doRequest(getGithubRepoSearchUrl(query), { startCB, callback, endCB });
}

const searchInput = document.querySelector('#input');
const listElement = document.querySelector('#response');
const loadingElement = document.querySelector('#loading');
const errorElement = document.querySelector('#error');
const toggleShowingResultsElement = document.querySelector(
  '#showingResultsFor'
);

const searchForm = document.querySelector('#form');

const toggleLoading = (show = false) => {
  loadingElement.style.display = show ? 'block' : 'none';
};

const toggleError = (err) => {
  errorElement.style.display = 'block';
  errorElement.innerText = err;
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

function makeSearch(event) {
  event.preventDefault();
  
  searchRepos(
    searchInput.value,
    () => {
      listElement.innerHTML = '';
      toggleLoading(true);
    },
    ({ items }) => {
      //stopping the loading icon when the call is over
      toggleLoading();
      if (error) {
        toggleShowingResultsElement.innerText = ' ';
        return toggleError('Sorry, The request is facing an error right now!');
      } 
      else if (items['length'] === 0) {
        toggleShowingResultsElement.innerText = ' ';
        return toggleError(
          'No results for your search, try searching for other repositories!'
        );
      } 
      else {
        toggleShowResults(searchInput.value);
        items.forEach((item) => appendRepo(item));
      }
    },
    () => {
      searchForm.reset();
      return false;
    }
  );
}

function toggleShowResults(textInput = ' ') {
  toggleShowingResultsElement.style.display = 'block';
  toggleShowingResultsElement.innerText = `Showing Results for: ${textInput}`;
}

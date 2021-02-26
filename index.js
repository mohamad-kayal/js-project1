const GITHUB_API_URL = 'https://api.github.com';

function getGithubRepoSearchUrl(query) {
  return `${GITHUB_API_URL}/search/repositories?q=${query}&page=1&per_page=10`;
}

function doRequest(url, requestInfo) {
  const { method, body, startCB, callback, endCB } = requestInfo;

  if (startCB) {
    startCB();
  }

  fetch(url, { method: method || 'GET', body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((data) => {
      if (callback) {
        callback(null, data);
      }
    })
    .catch((err) => {
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
  const repoDescElement = document.createElement('h3');
  const repoNameElement = document.createElement('p');
  const repoUserUrlElem = document.createElement('a');
  const repoUrlElem = document.createElement('a');

  userPersonalPic.src = avatar_url;
  repoElement.appendChild(userPersonalPic);

  repoDescElement.innerText = description;
  repoElement.appendChild(repoDescElement);

  repoNameElement.innerText = fullName;
  repoElement.appendChild(repoNameElement);

  repoUserUrlElem.href = url;
  repoUserUrlElem.innerText = 'User Profile';
  repoElement.appendChild(repoUserUrlElem);

  repoElement.appendChild(document.createElement('br'));

  repoUrlElem.href = htmlUrl;
  repoUrlElem.innerText = "Repository's home page";
  repoElement.appendChild(repoUrlElem);

  listElement.appendChild(repoElement);
};

// combining the onClick with the form
function makeSearch(event) {
  if (errorElement.innerText != '') {
    errorElement.innerText = '';
  }

  event.preventDefault();

  searchRepos(
    searchInput.value,
    () => {
      listElement.innerHTML = '';
      toggleLoading(true);
    },
    (error, data) => {
      toggleLoading();

      if (error) {
        toggleShowingResultsElement.innerText = '';
        toggleError('Sorry, The request is facing an error right now!');

        return;
      }

      const { items } = data;

      if (!items.length) {
        toggleShowingResultsElement.innerText = '';
        toggleError(
          'No results for your search, try searching for other repositories!'
        );

        return;
      }

      toggleShowResults(searchInput.value);
      items.forEach((item) => appendRepo(item));
    },
    () => {

      searchForm.reset();
    }
  );
}

function toggleShowResults(textInput) {
  toggleShowingResultsElement.style.display = 'block';
  toggleShowingResultsElement.innerText = `Showing Results for: ${textInput}`;
}

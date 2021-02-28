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
const searchForm = document.querySelector('#form');
const elementResults = document.querySelector(
  '#showResults'
);

// renamed the function from toggleLoading to handleLoading
const handleLoading = (show = false) => {
  loadingElement.style.display = show ? 'block' : 'none';
};

// renamed the function from toggleError to handleError - removed Indian code
const handleError = (err) => {
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
  // moved event.preventDefault() to the top - indian code
  event.preventDefault();

  if (errorElement.innerText != '') {
    errorElement.innerText = '';
  };

  searchRepos(
    searchInput.value,
    searchStartCB,
    searchSuccessErrorCB,
    searchFinalCB
  );
}

function searchStartCB() {
  listElement.innerHTML = '';
  handleLoading(true);
}

function searchSuccessErrorCB(error, data) {
  // renamed the functions and variables - Indian code
  handleLoading();

  if (error) {
    elementResults.innerText = '';
    handleError('Sorry, The request is facing an error right now!');

    return;
  }

  const { items } = data;
  // renamed the showingResultsElement to elementResults and removed the error function - removed indian code
  if (!items.length) {
    elementResults.innerText = 'No Repositories found. Try searching for another!';

    return;
  }

  searchResults(searchInput.value);

  items.forEach((item) => appendRepo(item));
}

function searchFinalCB() {
  searchForm.reset();
}

// renamed the function and variables - indian code 
function searchResults(textInput) {
  elementResults.style.display = 'block';
  elementResults.innerText = `Showing Results for: ${textInput}`;
}

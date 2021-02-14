const GITHUB_API_URL = 'https://api.github.com';
function getGithubRepoSearchUrl(query) {
  return `${GITHUB_API_URL}/search/repositories?q=${query}&page=1&per_page=10`;
}

function searchRepos(query, startCallback, callback, catchCB, finalCB) {
  if (startCallback) {
    startCallback();
  }
  
  fetch(getGithubRepoSearchUrl(query))
    .then(response => response.json())
    .then(data => {
      if (callback) {
        callback(data);
      }
    })
    .catch((err) => {
      if (catchCB) {
        catchCB(err);
      }
    })
    .finally(() => {
      finalCB();
    })
}

let searchInput;
let listElement;
let loadingElement;
let errorElement;
let showingResultFor;
let searchForm;
let errMessage;

window.onload = () => {
  searchInput = document.querySelector("#input");
  listElement = document.querySelector("#response");
  loadingElement = document.querySelector("#loading");
  errorElement = document.querySelector("#error");
  showingResultFor = document.querySelector("#showingResultsFor");
  searchForm = document.querySelector("#form");
  errMessage = document.createElement('p');
}
  

const appendRepo = ({ owner: { html_url:url}, owner: {avatar_url},full_name: fullName, html_url: htmlUrl, description }) => {
 
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
  repoUrlElem.innerText = 'Repository\'s home page';
  repoElement.appendChild(repoUrlElem);

  listElement.appendChild(repoElement);
};

function makeSearch () { // combining the onClick with the form
  searchRepos(searchInput.value, () => {
    toggleLoading(true);
    clearList();
    clearToggles(false,true);
  },
  ({ items }) => {
    showResultsFor(true,searchInput.value);
    if(!items) {
      throw "The Request is facing an error right now.\n If the problem persists, please don't contact customer service";
    };
    if(items ['length'] == 0) {
      throw "No Results";
    };
    toggleLoading();
    items.forEach(item => appendRepo(item));
  }, () => {
    toggleError(true, 'something went wrong, Please try again later!');
    showResultsFor(false);
  }, () => {
    searchForm.reset();
  });
  return false
};

const toggleLoading = (show = false) => {
  loadingElement.style.display = show ? 'block' : 'none';
};

const toggleError = (show = false, errorMessage) => {
  errMessage.innerText = errorMessage;
  clearToggles(true,true);
  // toggleLoading(false);
  errorElement.appendChild(errMessage);
  errorElement.style.display =  show ? 'block' : 'none';
};

function clearToggles(clearLoading = false ,clearError = false ){
  if (clearLoading) loadingElement.style.display = 'none' ; 
  if (clearError) errorElement.style.display= 'none' ;
};

function showResultsFor(show = false, textInput = ' '){
  showingResultFor.style.display = show? 'block' : 'none' ;
  showingResultFor.innerText = `Showing Results for: ${textInput}`;
}

function clearList() {
  listElement.innerHTML = '';
}
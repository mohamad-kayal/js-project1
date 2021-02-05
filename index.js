const GITHUB_API_URL = 'https://api.github.com';
function getGithubRepoSearchUrl(query) {
  return `${GITHUB_API_URL}/search/repositories?q=${query}&page=1&per_page=10`;
}

function searchRepos(query, startCallback, callback) {
  if (startCallback) {
    startCallback();
  }
  
  const response = fetch(getGithubRepoSearchUrl(query))
    .then(response => response.json())
    .then(data => {
      if (callback) {
        callback(data);
      }
    })
    .catch((err) => {
      toggleError(true,err);
    });
}
const searchInput = document.querySelector("#input");
const listElement = document.querySelector("#response");
const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const showingResultFor = document.querySelector("#showingResultsFor"); 
const searchForm = document.querySelector("#form");
const errMessage = document.createElement('p');
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
    listElement.innerHTML = '';
    clearToggles(false,true);
  },
  ({ items }) => {
    showResultsFor(true,searchInput.value);
    if(!items) throw "The Request is facing an error right now.\n If the problem persists, please don't contact customer service";
    if(items ['length'] == 0) throw "No Results";
    toggleLoading();
    searchForm.reset();
    items.forEach(item => appendRepo(item));
  });
};
function clearToggles(clearLoading = false ,clearError = false ){
  if (clearLoading) loadingElement.style.display = 'none' ; 
  if (clearError) errorElement.style.display= 'none' ;
}
function showResultsFor(show = false, textInput = ' '){
  showingResultFor.style.display = show? 'block' : 'none' ;
  showingResultFor.innerText = `Showing Results for: ${textInput}`;
}
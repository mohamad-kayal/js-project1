const GITHUB_API_URL = 'https://api.github.com';
let makeSearch = " ";
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
  
  const toggleLoading = (show = false) => {
    loadingElement.style.display = show ? 'block' : 'none';
  };
  errorElement.innerText = ' ';
  
  const toggleError = (show = false, errorMessage) => {
    const errMessage = document.createElement('p');
    errMessage.innerText = errorMessage
    errorElement.appendChild(errMessage);
    errorElement.style.display =  show ? 'block' : 'none';
    toggleLoading(false);
};

  const appendRepo = ({ owner: { html_url:url}, full_name: fullName, html_url: htmlUrl, description }) => {
    const repoElement = document.createElement('li');

    const repoNameElement = document.createElement('h3');
    repoNameElement.innerText = fullName;
    repoElement.appendChild(repoNameElement);

    const repoDescElement = document.createElement('p');
    repoDescElement.innerText = description;
    repoElement.appendChild(repoDescElement);

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

   makeSearch =()=> { // combining the onClick with the form

    searchRepos(searchInput.value, () => {
      // toggleError(false);
      toggleLoading(true);
      listElement.innerHTML = '';
    }, ({ items }) => {

        if(!items) throw "The Request is facing an error right now.\n If the problem persists, please don't contact any onoe";
        if(items ['length'] == 0) throw "No Results";
        toggleLoading();
        searchInput.value = '';
        items.forEach(item => appendRepo(item));
      
    });
};
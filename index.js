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
    .catch(() => {

    });
}

window.onload = () => {
  const searchInput = document.querySelector("#input");
  const submitButton = document.querySelector("#btn-submit");
  const listElement = document.querySelector("#response");
  const loadingElement = document.querySelector("#loading");

  const toggleLoading = (show = false) => {
    loadingElement.style.display = show ? 'block' : 'none';
  };

  const appendRepo = ({ owner: { url }, full_name: fullName, html_url: htmlUrl, description }) => {
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

  submitButton.addEventListener('click', () => {
    searchRepos(searchInput.value, () => {
      toggleLoading(true);

      listElement.innerHTML = '';
    }, ({ items }) => {
      toggleLoading();

      searchInput.value = '';

      items.forEach(item => appendRepo(item));
    });
  });
};

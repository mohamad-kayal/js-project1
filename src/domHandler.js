

const appendRepo = ({owner: { html_url: url },
    owner: { avatar_url },
    full_name: fullName,
    html_url: htmlUrl,
    description}) => {
    
    const repoElement = document.createElement('li');
    const userPersonalPic = document.createElement('img');
    console.log(fullName);
    userPersonalPic.src = item;
    repoElement.appendChild(userPersonalPic);
  
    // const repoDescElement = document.createElement('h3');
    // repoDescElement.innerText = description;
    // repoElement.appendChild(repoDescElement);
  
    // const repoNameElement = document.createElement('p');
    // repoNameElement.innerText = fullName;
    // repoElement.appendChild(repoNameElement);
  
    // const repoUserUrlElem = document.createElement('a');
    // repoUserUrlElem.href = url;
    // repoUserUrlElem.innerText = 'User Profile';
    // repoElement.appendChild(repoUserUrlElem);
  
    // repoElement.appendChild(document.createElement('br'));
  
    // const repoUrlElem = document.createElement('a');
    // repoUrlElem.href = htmlUrl;
    // repoUrlElem.innerText = "Repository's home page";
    // repoElement.appendChild(repoUrlElem);
    // listElement.appendChild(repoElement);
  }
export {appendRepo};  
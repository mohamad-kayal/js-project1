const { expect } = require('@jest/globals');
const {getGithubRepoSearchUrl, doRequest, searchRepos, toggleLoading, toggleError, appendRepo, makeSearch, searchStartCB, searchSuccessErrorCB, searchFinalCB, toggleSearchResults}= require('../src/index.js');

describe('Testing API link', () => {
  test('Query inserted', () => {
      let query = 'test';
    expect(getGithubRepoSearchUrl(query)).toBe(
      `https://api.github.com/search/repositories?q=${query}&page=1&per_page=10`
    );
  });

  test('No Entries', () => {
      // the query input will be undefined 
    expect(getGithubRepoSearchUrl()).toEqual(`https://api.github.com/search/repositories?q=undefined&page=1&per_page=10`);
  });
});


describe('Testing doRequest Function', ()=>{

});

describe("Testing searchRepos Function", ()=>{
    
});

describe("Testing toggleLoading Function", ()=>{
    
});

describe("Testing toggleError Function", ()=>{
    
});

describe("Testing appendRepo Function", ()=>{
    
});

describe("Testing makeSearch Function", ()=>{
    
});

describe("Testing searchStartCB Function", ()=>{
    
});

describe("Testing searchSuccessErrorCB Function", ()=>{
    
});

describe("Testing searchFinalCB Function", ()=>{
    
});

describe("Testing toggleSearchResults Function", ()=>{
    
});


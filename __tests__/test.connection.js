const getGithubRepoSearchUrl = require('../src/connection');

describe("Testing connection", ()=>
{
  test('Testing Query', () => {
    expect(getGithubRepoSearchUrl('testingQuery')).toBe('https://api.github.com/search/repositories?q=testingQuery&page=1&per_page=10');
  });

})
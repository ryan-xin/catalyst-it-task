import React, { useState, useEffect } from 'react';
import RepoDetails from './RepoDetails';
import axios from 'axios';

const RepoList = () => {
  
  const REPO_LIST_URL = 'https://api.github.com/orgs/catalyst/repos';
  
  const [page, setPage] = useState(1);
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('created');
  const [direction, setDirection] = useState('asc');
  const [repos, setRepos] = useState([]);
  
  const REQUEST_REPO_URL = `${REPO_LIST_URL}?type=${type}&sort=${sort}&direction=${direction}&page=${page}`;
  
  useEffect(() => {
    axios.get(REQUEST_REPO_URL)
    .then(res => {
      console.log(res.data);
      setRepos(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <div>
      <h2>List</h2>
      <ul>
        {
          repos.map(repo => {
            return (
              <li key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <button>Learn More</button>
                <RepoDetails />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};

export default RepoList;
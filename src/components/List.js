import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = () => {
  
  const BASE_REPO_URL = 'https://api.github.com/orgs/catalyst/repos';
  
  const [page, setPage] = useState(1);
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('created');
  const [direction, setDirection] = useState('asc');
  const [repos, setRepos] = useState([]);
  
  const REQUEST_REPO_URL = `${BASE_REPO_URL}?type=${type}&sort=${sort}&direction=${direction}&page=${page}`;
  
  useEffect(() => {
    axios.get(REQUEST_REPO_URL)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <div>
      <h2>List</h2>
    </div>
  )
};

export default List;
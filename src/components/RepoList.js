import '../style/RepoList.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import RepoContributors from './RepoContributors';
import axios from 'axios';

const RepoList = () => {
  
  const REPO_LIST_URL = 'https://api.github.com/orgs/catalyst/repos';
  const ACCESS_TOKEN = 'f75ceca1e36ec67b0f388a2595b70fe6ca806999';
  
  const [page, setPage] = useState(1);
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('created');
  const [direction, setDirection] = useState('asc');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  
  const observer = useRef();
  const lastRepoElement = useCallback(repo => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('last');
        setPage(prevPage => {
          return prevPage + 1;
        })
      }
    });
    if (repo) observer.current.observe(repo);
    console.log(repo);
  }, [loading, hasMore]);
  
  // const [previousDisabled, setPreviousDisabled] = useState(true);
  // const [nextDisabled, setNextDisabled] = useState(false);
  
  const REQUEST_REPO_URL = `${REPO_LIST_URL}?type=${type}&sort=${sort}&direction=${direction}&page=${page}`;
  
  const handleFilterChange = (e) => {
    setType(e.target.value);  
  };
  
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  
  const handleOrderChange = (e) => {
    setDirection(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(REQUEST_REPO_URL, {
      headers: {
        // 'Authorization': ACCESS_TOKEN,
        'User-Agent': 'request'
      }
    })
    .then(res => {
      console.log(res.data);
      setRepos(prevRepos => {
        return [...prevRepos, ...res.data]
      });
      setHasMore(res.data.length > 0);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, [page, type, sort, direction]);
  
  return (
    <div className="list-container">
      <div className="filter-sort-container">
        <div>
          <h3>Filter</h3>
          <select type="text" name="filter" placeholder="all" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="forks">Forked</option>
            <option value="sources">Not Forked</option>
          </select>
        </div>
        <div>
          <h3>Sort</h3>
          <div className="sort-select-container">
          <select type="text" name="sort" placeholder="created" onChange={handleSortChange}>
            <option value="created">Created Time</option>
            <option value="updated">Updated Time</option>
            <option value="full_name">Full Name</option>
          </select>
          <select type="text" name="order" placeholder="asc" onChange={handleOrderChange}>
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
          </select>
          </div>
        </div>
      </div>
      <div className="list-item-container">
        <ul>
          {
            repos.map((repo, index) => {
              if (repos.length === index + 1) {
                return (
                  <li key={repo.id} ref={lastRepoElement}>
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                    {
                      repo.fork ? (
                        <p>Forked</p>
                      ) : (
                        <p>Not Forked</p>
                      )
                    }
                    <h4>GitHub URL:</h4>
                    <p>{repo.html_url}</p>
                    <h4>Stars:</h4>
                    <p>{repo.stargazers_count}</p>
                    <h4>Watchers:</h4>
                    <p>{repo.watchers_count}</p>
                    <h4>Language:</h4>
                    <p>{repo.language}</p>
                    <h4>License:</h4>
                    {
                      repo.license ? (
                        <p>{repo.license.name}</p>
                      ) : (
                        <p>N/A</p>
                      )
                    }
                    <RepoContributors repoName={repo.name}/>
                  </li>
                )
              } else {
                return (
                  <li key={repo.id} >
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                    {
                      repo.fork ? (
                        <p>Forked</p>
                      ) : (
                        <p>Not Forked</p>
                      )
                    }
                    <h4>GitHub URL:</h4>
                    <p>{repo.html_url}</p>
                    <h4>Stars:</h4>
                    <p>{repo.stargazers_count}</p>
                    <h4>Watchers:</h4>
                    <p>{repo.watchers_count}</p>
                    <h4>Language:</h4>
                    <p>{repo.language}</p>
                    <h4>License:</h4>
                    {
                      repo.license ? (
                        <p>{repo.license.name}</p>
                      ) : (
                        <p>N/A</p>
                      )
                    }
                    <RepoContributors repoName={repo.name}/>
                  </li>
                )
              }
            })
          }
        </ul>
        <div>{loading && "Loading..."}</div>
      </div>
    </div>
  )
};

export default RepoList;
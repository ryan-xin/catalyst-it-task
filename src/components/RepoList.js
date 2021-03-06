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
  
  const REQUEST_REPO_URL = `${REPO_LIST_URL}?type=${type}&sort=${sort}&direction=${direction}&page=${page}`;
  
  // useRef is a value that persists after each render
  // to store something between renders that isn't part of state 
  // get references that related to document API
  const observer = useRef();
  // use useCallback to call the function inside when the last repo of each request is created
  const lastRepoElement = useCallback(repo => {
    // To prevent constant calling the api
    if (loading) return
    // Stop to observe the intersection observer instance from previous element
    if (observer.current) observer.current.disconnect();
    // Create an intersection observer instance (when the instance is intersecting with viewport run the callback)
    observer.current = new IntersectionObserver(entries => {
      // Only when the instance is visible (entries[0])
      if (entries[0].isIntersecting && hasMore) {
        console.log('last');
        setPage(prevPage => {
          return prevPage + 1;
        })
      }
    });
    // Start to observe
    if (repo) observer.current.observe(repo);
    console.log(repo);
    // Return a memorized version of callback that only changes if one of the dependencies has changed
  }, [loading, hasMore]);
  
  const handleFilterChange = (e) => {
    setType(e.target.value);  
  };
  
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  
  const handleOrderChange = (e) => {
    setDirection(e.target.value);
  };
  
  // Page changes to run useEffect to append more repos to the end
  useEffect(() => {
    // Show loading
    setLoading(true);
    axios.get(REQUEST_REPO_URL, {
      headers: {
        'Authorization': ACCESS_TOKEN,
        // 'User-Agent': 'ryan-xin'
      }
    })
    .then(res => {
      console.log(res.data);
      // Keep the previous repos and append new repos to the end
      setRepos(prevRepos => {
        return [...prevRepos, ...res.data]
      });
      setHasMore(res.data.length > 0);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, [page]);

  // Type / Sort / Direction change to run useEffect to get new repos
  useEffect(() => {
    setLoading(true);
    axios.get(REQUEST_REPO_URL, {
      headers: {
        'Authorization': ACCESS_TOKEN,
        // 'User-Agent': 'ryan-xin'
      }
    })
    .then(res => {
      console.log(res.data);
      setRepos(res.data);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, [type, sort, direction]);
  
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
              {/* The last repo of each request */}
              if (repos.length === index + 1) {
                return (
                  <li key={repo.id} ref={lastRepoElement}>
                    <div className="divider-list"></div>
                    <div className="list-item-header">
                      <h2>{repo.name}</h2>
                      {
                        repo.fork ? (
                          <p className="tag forked-tag">Forked</p>
                        ) : (
                          <p className="tag unforked-tag">Not Forked</p>
                        )
                      }
                    </div>
                    <h4>{repo.description}</h4>
                    <div className="list-item-detail-container">
                      <p>GitHub URL:</p>
                      <a className= "repo-url" href={repo.html_url}>{repo.html_url}</a>
                      <div className="two-columns-layout">
                        <div>
                          <p>Stars:</p>
                          <h3>{repo.stargazers_count}</h3>
                        </div>
                        <div>
                          <p>Watchers:</p>
                          <h3>{repo.watchers_count}</h3>
                        </div>
                        <div>
                          <p>Language:</p>
                          <h3>{repo.language}</h3>
                        </div>
                        <div>
                          <p>License:</p>
                          {
                            repo.license ? (
                              <h3>{repo.license.name}</h3>
                            ) : (
                              <h3>N/A</h3>
                            )
                          }
                        </div>
                      </div>
                      <RepoContributors repoName={repo.name}/>
                    </div>
                  </li>
                )
              } else {
                return (
                  <li key={repo.id}>
                    <div className="divider-list"></div>
                    <div className="list-item-header">
                      <h2>{repo.name}</h2>
                      {
                        repo.fork ? (
                          <p className="tag forked-tag">Forked</p>
                        ) : (
                          <p className="tag unforked-tag">Not Forked</p>
                        )
                      }
                    </div>
                    <h4>{repo.description}</h4>
                    <div className="list-item-detail-container">
                      <p>GitHub URL:</p>
                      <a className= "repo-url" href={repo.html_url}>{repo.html_url}</a>
                      <div className="two-columns-layout">
                        <div>
                          <p>Stars:</p>
                          <h3>{repo.stargazers_count}</h3>
                        </div>
                        <div>
                          <p>Watchers:</p>
                          <h3>{repo.watchers_count}</h3>
                        </div>
                        <div>
                          <p>Language:</p>
                          <h3>{repo.language}</h3>
                        </div>
                        <div>
                          <p>License:</p>
                          {
                            repo.license ? (
                              <h3>{repo.license.name}</h3>
                            ) : (
                              <h3>N/A</h3>
                            )
                          }
                        </div>
                      </div>
                      <RepoContributors repoName={repo.name}/>
                    </div>
                  </li>
                )
              }
            })
          }
        </ul>
        <div className="loading">{loading && "Loading..."}</div>
      </div>
    </div>
  )
};

export default RepoList;
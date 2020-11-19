import '../style/RepoContributors.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepoContributors = (props) => {
  
  const REPO_CONTRIBUTORS_URL = `https://api.github.com/repos/catalyst/${props.repoName}/contributors?per_page=5`;
  const ACCESS_TOKEN = 'f75ceca1e36ec67b0f388a2595b70fe6ca806999';
  
  const [contributors, setContributors] = useState([]);
  
  useEffect(() => {
    axios.get(REPO_CONTRIBUTORS_URL, {
      headers: {
        'Authorization': ACCESS_TOKEN,
        'User-Agent': 'request'
      }
    })
    .then(res => {
      console.log(res.data);
      setContributors(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <div>
      {
        contributors.length > 0 && (
          <div className="contributors-container">
            <p>Top 5 Contributors:</p>
            <ul>
              {
                contributors.map(contributor => {
                  return (
                    <li key={contributor.id}>
                      <h3>- {contributor.login}: {contributor.contributions} contributions</h3>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
};

export default RepoContributors;
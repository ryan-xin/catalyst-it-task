import '../style/Profile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  
  const ORG_URL = 'https://api.github.com/orgs/catalyst';
  const ACCESS_TOKEN = 'f75ceca1e36ec67b0f388a2595b70fe6ca806999';
  
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    location: '',
    totalRepos: null,
    blogUrl: '',
    gitHubUrl: ''
  });
  
  useEffect(() => {
    axios.get(ORG_URL, {
      headers: {
        // 'Authorization': ACCESS_TOKEN,
        'User-Agent': 'request'
      }
    })
    .then(res => {
      console.log(res.data);
      setProfile({...profile,
        name: res.data.name,
        description: res.data.description,
        location: res.data.location,
        totalRepos: res.data.public_repos,
        blogUrl: res.data.blog,
        gitHubUrl: res.data.url
      });
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="profile-container">
      <h1>{profile.name}</h1>
      <h4>{profile.description}</h4>
      <div className="divider"></div>
      <ul>
        <li><p>{profile.location}</p></li>
        <li><p>{profile.totalRepos} Repositories</p></li>
        <li><p>{profile.blogUrl}</p></li>
        <li><p>{profile.gitHubUrl}</p></li>
      </ul>
    </div>
  )
};

export default Profile;
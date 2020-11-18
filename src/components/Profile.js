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
        'Authorization': ACCESS_TOKEN
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
    <div>
      <h2>Profile</h2>
      <h4>Name:</h4>
      <p>{profile.name}</p>
      <h4>Description:</h4>
      <p>{profile.description}</p>
      <h4>Location:</h4>
      <p>{profile.location}</p>
      <h4>Total Repositories:</h4>
      <p>{profile.totalRepos}</p>
      <h4>Blog URL:</h4>
      <p>{profile.blogUrl}</p>
      <h4>GitHub URL:</h4>
      <p>{profile.gitHubUrl}</p>
    </div>
  )
};

export default Profile;
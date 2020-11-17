import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  
  const ORG_URL = 'https://api.github.com/orgs/catalyst';
  
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    location: '',
    totalRepos: null,
    blogUrl: '',
    gitHubUrl: ''
  });
  
  useEffect(() => {
    axios.get(ORG_URL)
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
      <p>Name:</p>
      <h4>{profile.name}</h4>
      <p>Description:</p>
      <h4>{profile.description}</h4>
      <p>Location:</p>
      <h4>{profile.location}</h4>
      <p>Total Repositories:</p>
      <h4>{profile.totalRepos}</h4>
      <p>Blog URL:</p>
      <h4>{profile.blogUrl}</h4>
      <p>GitHub URL:</p>
      <h4>{profile.gitHubUrl}</h4>
    </div>
  )
};

export default Profile;
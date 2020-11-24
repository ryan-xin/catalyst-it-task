import '../style/Profile.css';
import React, { useState, useEffect } from 'react';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        'Authorization': ACCESS_TOKEN,
        'User-Agent': 'ryan-xin'
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
      <div className="divider-profile"></div>
      <ul>
        <li className="profile-list-container-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p>{profile.location}</p>
        </li>
        <li className="profile-list-container-repos">
          <FontAwesomeIcon icon={faBook} />
          <p>{profile.totalRepos} Repositories</p>
        </li>
        <li className="profile-list-container-blog">
          <FontAwesomeIcon icon={faBlog} />
          <p>{profile.blogUrl}</p>
        </li>
        <li className="profile-list-container-github">
          <FontAwesomeIcon icon={faGithub} />
          <p>{profile.gitHubUrl}</p>
        </li>
      </ul>
    </div>
  )
};

export default Profile;
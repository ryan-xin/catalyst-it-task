import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepoDetails = () => {
  
  const REPO_DETAIL_URL = `https://api.github.com/repos/catalyst/${}/contributors`;
  
  const [currentRepo, setCurrentRepo] = useState({
    
  });
  
  return (
    <div>
      <h2>Details</h2>
    </div>
  )
};

export default RepoDetails;
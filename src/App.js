import './style/App.css';
import Profile from './components/Profile';
import RepoList from './components/RepoList';

function App() {
  return (
    <div className="main-container">
      <Profile />
      <RepoList />
    </div>
  );
}

export default App;

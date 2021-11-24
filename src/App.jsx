import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import GameList from './components/GameList';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GameDetails from './components/GameDetails';

function App() {
  const [favoris, setFavoris] = useState([]);
  useEffect(() => {
    let temp = null;
    if (localStorage.getItem('fav') === null) temp = null;
    else temp = localStorage.getItem('fav').split(',');
    if (temp === null) setFavoris([]);
    else {
      temp =temp.filter((item) => item !== '');
      setFavoris(temp.map(fav => parseInt(fav)))
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('fav', favoris);
  }, [favoris]);
  return (
    <div className='App'>
    <Header name='React Game'/>
    <Router>
      <Routes>
        <Route path='/' element={<GameList favoris={favoris} setFavoris={setFavoris}/>}/>
        <Route path='/games/:id' element={<GameDetails favoris={favoris} setFavoris={setFavoris}/>}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;

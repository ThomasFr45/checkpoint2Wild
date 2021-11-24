import { useEffect, useState } from "react";
import Game from "./Game";
import Fav from './Fav';

const GameList = ({favoris, setFavoris}) => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [clickedFav, setClickedFav] = useState(false);
  useEffect(() => {
    fetch("https://wild-games.jsrover.wilders.dev/games").then((response) => {
      response.json().then((result) => {
        setData(result);
      });
    });
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleFav = () => {
    setClickedFav(!clickedFav);
  };

  const remove = (id) => {
    setData(data.filter((game) => game.id !== id));
  };

  const handleFavClick = (id) => {
    if (!favoris.includes(id)) {
      setFavoris([...favoris, id]);
    } else {
      setFavoris(favoris.filter(fav => fav !== id))
    }
  }
  const filtered = data.filter((game) => game.rating > 4.5);
  if (!filtered[0] && clicked === true && !clickedFav) {
    return (
      <>
        <div className='buttons'>
        <button
          className={clicked ? "filterButtonOn" : "filterButtonOff"}
          onClick={handleClick}
        >
          Filter : {clicked ? "ON ヾ(≧▽≦*)o" : "OFF (╬▔皿▔)╯"}
        </button>
        <button className='favButton' onClick={handleFav}>Fav List ❤️</button>
        </div>
        <p>Nothing to see here !!! ヽ（≧□≦）ノ</p>
      </>
    );
  } else if (clickedFav) {
    return (<>
    <button className='favButton' onClick={handleFav}>Fav List ❤️</button>
    <div className='games'>
    {favoris.map(item => <Fav key={item} id={item} favoris={favoris} setFavoris={setFavoris}/>)}
    </div>
    {favoris[0] ? null : <p>Nothing to see here !!! ヽ（≧□≦）ノ</p>}
    </>)
  }else if (data[0]) {
    return (
      <div>
        <div className='buttons'>
        <button
          className={clicked ? "filterButtonOn" : "filterButtonOff"}
          onClick={handleClick}
        >
          Filter : {clicked ? "ON ヾ(≧▽≦*)o" : "OFF (╬▔皿▔)╯"}
        </button>
        <button className='favButton' onClick={handleFav}>Fav List ❤️</button>
        </div>
        <div className="games">
          {clicked
            ? data.map((game) =>
                game.rating > 4.5 ? (
                  <div key={game.name} className="game">
                    <Game game={game} />
                    <button className="remove" onClick={() => remove(game.id)}>
                      (っ °Д °;)っ 🗑️
                    </button>
                    <button className="remove" onClick={() => handleFavClick(game.id)}>
                    {favoris.includes(game.id) ? "(❤️ ω ❤️))" : "(❤ ω ❤)"}
                    </button>
                  </div>
                ) : null
              )
            : data.map((game) => (
                <div key={game.name} className="game">
                  <Game game={game}/>
                  <button className="remove" onClick={() => remove(game.id)}>
                    (っ °Д °;)っ 🗑️
                  </button>
                  <button className="remove" onClick={() => handleFavClick(game.id)}>
                  {favoris.includes(game.id) ? "(❤️ ω ❤️))" : "(❤ ω ❤)"}
                    </button>
                </div>
              ))}
        </div>
      </div>
    );
  } else {
    return <p>Nothing to see here ! ヽ（≧□≦）ノ</p>;
  }
};

export default GameList;

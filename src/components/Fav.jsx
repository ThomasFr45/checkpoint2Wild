import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const Fav = ({ id, favoris, setFavoris }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://wild-games.jsrover.wilders.dev/games/${id}`).then(response => {
      response.json().then(result => {
        setData(result);
      })
    })
  }, [id])

  const handleUnfav = (id) => {
    setFavoris(favoris.filter((item) => item !== id));
  };

  return (
    <div className='game'>
      <div>
      <h4>{data.name}</h4>
      <img className='gameimg'src={data.background_image} alt="" />
      <p>Rating : {data.rating}</p>
      <Link to={`/games/${data.id}`}><button className='details'>Game Details📜</button></Link>
    </div>
    <button className="remove" onClick={() => handleUnfav(id)}>
                    (❤️ ω ❤️))
                    </button>
    </div>
  );
}

export default Fav;
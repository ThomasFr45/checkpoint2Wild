import { Link } from 'react-router-dom';
const Game = ({ game }) => {
  return (
    <div>
      <h4>{game.name}</h4>
      <img className='gameimg'src={game.background_image} alt="" />
      <p>Rating : {game.rating}</p>
      <Link to={`/games/${game.id}`}><button className='details'>Game Details📜</button></Link>
    </div>
  )
}

export default Game;
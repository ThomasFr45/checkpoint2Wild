import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

const GameDetails = ({ favoris, setFavoris }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://wild-games.jsrover.wilders.dev/games/${id}`).then(
      (response) => {
        response.json().then((result) => {
          setData(result);
        });
      }
    );
  }, [id]);
  const getImages = () => {
    const images = [];
    data.short_screenshots?.map((image) => images.push(image.image));
    return images;
  };
  const images = getImages();

  const next = () => {
    if (index >= images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const previous = () => {
    if (index <= 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handleFavClick = (id) => {
    if (!favoris.includes(id)) {
      setFavoris([...favoris, id]);
    } else {
      setFavoris(favoris.filter((fav) => fav !== id));
    }
  };
  return (
    <div className='detailspage'>
            <Link to={`/`}><button className='details'>Go Back</button></Link>
      <h4>{data.name}</h4>
      <img className="gameimg" src={data.background_image} alt="" />
      <p>Release date : {data.released}</p>
      <p>Genre : {data.genres?.map((genre) => `${genre.name} `)}</p>
      <p>Rating : {data.rating}</p>
      <button className="remove" onClick={() => handleFavClick(id)}>
        {favoris?.includes(id) ? "(❤️ ω ❤️))" : "(❤ ω ❤)"}
      </button>
      {data.clip ? (
        <video className='video'width="320" height="240" controls>
          <source src={data.clip.clip} type="video/mp4" />
          <source src={data.clip.clip} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      ) : null}
      {images[0] ? (
        <div className="images">
          <button className="arrow left" onClick={previous}></button>
          <img className="screen" src={images[index]} alt="" />
          <button className="arrow right" onClick={next}></button>
        </div>
      ) : null}
    </div>
  );
};

export default GameDetails;

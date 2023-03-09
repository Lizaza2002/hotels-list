import './App.css';
import { useState } from 'react';
import { data } from './data';

function App() {
  const [hotels, setHotels] = useState(data);
  const [showText, setShowText] = useState(false);
  const [picture, setPicture] = useState(0);
  
  
  let bestHotels;
  if (hotels.length < 5 && hotels.length > 1) {
    bestHotels =  'лучших отеля';
  }
  else if ( hotels.length === 1) {
    bestHotels =  'лучший отель';
  }
  else bestHotels =  'лучших отелей';

  const removeHotel = (id) => {
    let newHotels = hotels.filter(hotel => hotel.id !== id);
    setHotels(newHotels)
  }

  const showTextClick = (hotel) => {
    hotel.showMore = !hotel.showMore;
    setShowText(!showText)
  }

  const previousPic = () => {
      setPicture(picture => {
        picture--;
        if (picture < 0) {
          picture = 3;
        }
        return picture;
    });
    
  }

  const nextPic = () => {
    setPicture( picture => {
      picture++;
      if (picture > 3) {
        picture = 0;
      }
      return picture;
    })
  }


  return(
    <div className='main-div'>
      <div className='box'>
      <div className='container'>
        <h1>{hotels.length} {bestHotels} Сочи с видом на море или горы </h1>
      </div>
      
      {hotels.map(hotel => {
        const {id, hotelName, description, source, image, showMore} = hotel;
        return(
          <div key={id} className="main-div">
          <div className='container'>
            <h2>{hotelName}</h2>
          </div>

          <div className='container'>
            <p>{showMore ? description : description.substring(0, 185) + "....."}
            <button onClick={() => showTextClick(hotel)}>{showMore ? "Скрыть" : "Показать"}</button></p>
            
          </div>

          <div className='container'>
            <button className='button' onClick={() => previousPic()}><i class="left"></i> Назад</button>
            <img src={image[picture]} width="500px" alt=''></img>
            <button className='button' onClick={() => nextPic()}>Вперед <i class="right"></i></button>
          </div>

          <div className='container'>
          <p>{source}</p>
          </div>

          <div className='container'>
          <button className='btn' onClick={() => removeHotel(id)}>Удалить из списка</button>
          </div>
          </div>
        )
      })}
      <div className='container'>
        <button className='btn all' onClick={() => setHotels([])}>Удалить весь список</button>
      </div>
      </div>
    </div>
  )
}

export default App;



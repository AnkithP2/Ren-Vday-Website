import { useState } from 'react'
import { useRef, useEffect } from 'react';
import './App.css'

function App() {
  const [index, setIndex] = useState(0);
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  const conatinerRef = useRef(null);

  const imgArray = [];
  Object.values(import.meta.glob("./assets/*.png", { eager: true })).forEach(
    ({ default: path }) => {
      const url = new URL(path, import.meta.url);
      const data = {
        path: url.pathname,
      };
      imgArray.push(data);
    }
  );

  // useEffect(() => {
  //     const interval = setInterval(() => {

  //     if(index+1 >= imgArray.length){
  //       setIndex(0);
  //     }
  //     else{
  //       setIndex(index + 1);
  //     }
      
  //     return () => clearInterval(interval);
  // }, 5000);

  // }, [index])

  const getRandomNumber = (min : number, max : number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const noButton = document.querySelector('btn-no');
  const handleMouseOver = () => {
    if(noButtonRef.current && conatinerRef.current){
      const containerHeight = 900;
      const containerWidth = 1750;
      const btnHeight = noButtonRef.current.getBoundingClientRect().height;
      const btnWidth = noButtonRef.current.getBoundingClientRect().width;
      const btnLeft = noButtonRef.current.getBoundingClientRect().left;
      const btnTop = noButtonRef.current.getBoundingClientRect().top;

      let newLeft = btnLeft;
      let newTop = btnTop;
      while(Math.abs(newTop - btnTop) < containerHeight / 3){
        newTop = getRandomNumber(0, containerHeight - btnHeight);
      }

      while (Math.abs(newLeft - btnLeft) < containerWidth / 3) {
        newLeft = getRandomNumber(0, containerWidth - btnWidth);
      }

      noButtonRef.current!.style.left = Math.floor(newLeft) + "px";
      noButtonRef.current!.style.top = Math.floor(newTop) + "px";
    }
  }

  const handleYesClick = () => {
    if(yesButtonRef.current && noButtonRef.current && conatinerRef.current){
      noButtonRef.current.classList.add("hide");
      conatinerRef.current.children[0].classList.add("hide");
      conatinerRef.current.children[1].classList.remove("hide");
    }
  }

  return (
    <div className="App">
      <img src = "src/assets/be-mine-2.png" alt='valentine?' className = 'question'/>
      <img src = {imgArray[index].path} alt='rotating picture' />
      <div className='container' id='container' ref = {conatinerRef}>
        <img src='src/assets/erm-fingers.gif' alt='please' className='erm'/>
        <img src='src/assets/oh-yay.gif' alt='yes' className='celebrate hide'/>
        <button className='btn btn-yes' ref = {yesButtonRef} onClick={handleYesClick}>Yes</button>
        <button className='btn btn-no' ref={noButtonRef} onMouseOver={handleMouseOver}>No</button>
      </div>
    </div>
  )
}

export default App

import React, { useRef, useState } from 'react'

const Order_Tracking = () => {

  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countIntervalRef = useRef();

  function handleStart(){
    if(isRunning) return;

    setIsRunning(true);
    setIsPaused(false);
    
    countIntervalRef.current = setInterval(() => {
      setCount(prevCount => prevCount+1);
    }, 1000);
  }
  function handlePause(){
    if(!isRunning) return;

    clearInterval(countIntervalRef.current);

    setIsPaused(true);
    setIsRunning(false);
  }
  function handleResume(){
    if(!isPaused) return;

    setIsRunning(true);
    setIsPaused(false);

    countIntervalRef.current = setInterval(() => {
      setCount(prevCount => prevCount+1);
    }, 1000);
  }
  function handleStop(){
    clearInterval(countIntervalRef.current);
    setCount(0);
    setIsPaused(false);
    setIsRunning(false);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className='text-3xl mt-4!'>Counter: {count}</h1>

      <div className='flex gap-2 justify-center mt-2!'>
        <button className='btn-primary' onClick={handleStart}>Start</button>
        <button className='btn-primary' onClick={handlePause}>Pause</button>
        <button className='btn-primary' onClick={handleResume}>Resume</button>
        <button className='btn-primary' onClick={handleStop}>Stop</button>
      </div>
    </div>
  )
}

export default Order_Tracking;
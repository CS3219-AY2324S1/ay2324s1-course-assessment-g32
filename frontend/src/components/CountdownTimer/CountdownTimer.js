import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import './CountdownTimer.css';

const CountdownTimer = ({ duration }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return (
    <div className='countdown-timer-container'>
      <CircularProgress
        variant='determinate'
        value={(seconds / duration) * 100}
        size={60}
        thickness={4}
        sx={{ color: 'green' }}
        className='countdown-progress'
      />
      <Typography variant='h6' className='countdown-timer-text'>
        {seconds}s
      </Typography>
    </div>
  );
};

export default CountdownTimer;

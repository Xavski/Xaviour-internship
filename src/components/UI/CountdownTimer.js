import React, { useEffect, useState } from "react";

let time;

const CountdownTimer = ({ expiryDate }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = expiryDate;

  const getTime = () => {
    time = deadline - Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));

  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    
      <>
      {
        time < 0 ? 'EXPIRED' : <> {hours + 'h ' + minutes + 'm ' + seconds + 's'}</>
      }
      </>
  );
};

export default CountdownTimer;

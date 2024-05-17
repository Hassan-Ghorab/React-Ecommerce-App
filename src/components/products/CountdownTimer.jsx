/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';
import { useLanguage } from '../context/LanguageContext';

function CountdownTimer({ time }) {
  const { language } = useLanguage();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(time);
    targetDate.setDate(targetDate.getDate() + 4); 
    const updateCountdown = () => {
      const currentDate = new Date();
      const difference = targetDate - currentDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        // Countdown reached zero or negative, stop the countdown
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown(); 
    const interval = setInterval(updateCountdown, 1000); 

    return () => clearInterval(interval); 
  }, []); 

  // Helper function to format time
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className={styles.countdownTimer}>
      <div className={styles.timeContainer}>
        <p className={styles.timeTitle}>{language === 'en' ? 'Days' : 'يوم'}</p>
        <p className={styles.time}>
          {formatTime(timeRemaining.days)}
          <span>:</span>
        </p>
      </div>
      <div className={styles.timeContainer}>
        <p className={styles.timeTitle}>
          {language === 'en' ? 'Hours' : 'ساعة'}
        </p>
        <p className={styles.time}>
          {formatTime(timeRemaining.hours)}
          <span>:</span>
        </p>
      </div>
      <div className={styles.timeContainer}>
        <p className={styles.timeTitle}>
          {language === 'en' ? 'Minutes' : 'دقيقة'}
        </p>
        <p className={styles.time}>
          {formatTime(timeRemaining.minutes)}
          <span>:</span>
        </p>
      </div>
      <div className={styles.timeContainer}>
        <p className={styles.timeTitle}>
          {language === 'en' ? 'Seconds' : 'ثانية'}
        </p>
        <p className={styles.time}>{formatTime(timeRemaining.seconds)}</p>
      </div>
    </div>
  );
}

export default CountdownTimer;

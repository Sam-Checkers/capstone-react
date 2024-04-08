import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './Schedule.css';
import { useUserAuth } from './UserAuthContext';

const Schedule = () => {
  const { isAuthenticated, user } = useUserAuth();
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const currentDate = moment();
      const startOfWeek = currentDate.clone().startOf('week');
      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = startOfWeek.clone().add(i, 'days');
        days.push({
          dayOfWeek: day.format('ddd'),
          dayOfMonth: day.format('D'),
          month: day.format('MMMM')
        });
      }
      setDaysOfWeek(days);
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h2>Schedule</h2>
      {isAuthenticated ? (
        <div className="calendar-grid">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-day">
              <div className="day-header">
                <div>{day.dayOfWeek}</div>
                <div>{day.dayOfMonth}</div>
                <div>{day.month}</div>
              </div>
              <div className="bordered-column"></div>
              <div className="bordered-column"></div>
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to view the schedule.</p>
      )}
    </div>
  );
};

export default Schedule;
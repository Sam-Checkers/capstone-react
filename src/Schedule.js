import React from 'react';
import moment from 'moment';
import './Schedule.css';
import { useEffect, useState } from 'react';

const Schedule = ({ isLoggedIn }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.clone().add(i, 'days');
    daysOfWeek.push({
      dayOfWeek: day.format('ddd'),
      dayOfMonth: day.format('D'),
      month: day.format('MMMM')
    });
  }

  return (
    <div>
      <h2>Schedule</h2>
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
    </div>
  );
};

export default Schedule;
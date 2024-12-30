import React from "react";

// Function to get all days in the month
const getDaysInMonth = (date) => {
  const daysInMonth = [];
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  let currentDay = startOfMonth;
  while (currentDay <= endOfMonth) {
    daysInMonth.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  return daysInMonth;
};

const Calendar = ({ currentDate, events, onOpenModal }) => {
  const daysInMonth = getDaysInMonth(currentDate);

  // Get today's date to compare
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  return (
    <div className="calendar">
      {daysInMonth.map((day) => {
        // Check if this day is today
        const isToday = day.getDate() === todayDate && day.getMonth() === todayMonth && day.getFullYear() === todayYear;

        return (
          <div
            key={day.toString()}
            className={`calendar-day ${isToday ? "today" : ""}`} // Add "today" class if it's today's date
            onClick={() => onOpenModal({ date: day, events: events[day.getDate()] || [] })}
          >
            <div className="date">{day.getDate()}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;

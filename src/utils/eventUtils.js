const getEvents = (currentDate) => {
    const events = JSON.parse(localStorage.getItem("events")) || {};
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
    return events[monthKey] || {};
  };
  
  const saveEvent = (event) => {
    const events = JSON.parse(localStorage.getItem("events")) || {};
    const monthKey = `${event.date.getFullYear()}-${event.date.getMonth() + 1}`;
  
    if (!events[monthKey]) {
      events[monthKey] = {};
    }
  
    events[monthKey][event.date.getDate()] = [
      ...(events[monthKey][event.date.getDate()] || []),
      event,
    ];
  
    localStorage.setItem("events", JSON.stringify(events));
  };
  
  const deleteEvent = (event) => {
    const events = JSON.parse(localStorage.getItem("events")) || {};
    const monthKey = `${event.date.getFullYear()}-${event.date.getMonth() + 1}`;
    const dayEvents = events[monthKey][event.date.getDate()] || [];
    
    const updatedEvents = dayEvents.filter((e) => e !== event);
    events[monthKey][event.date.getDate()] = updatedEvents;
  
    localStorage.setItem("events", JSON.stringify(events));
  };
  
  export { getEvents, saveEvent, deleteEvent };
  
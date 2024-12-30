import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import { getEvents, saveEvent, deleteEvent } from "./utils/eventUtils";
import "./App.css";

function App() {
  // State for current date, events, and modal visibility
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(getEvents(currentDate));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Update events when current date changes
  useEffect(() => {
    setEvents(getEvents(currentDate));
  }, [currentDate]);

  // Handlers for switching months
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(nextMonth);
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(prevMonth);
  };

  // Modal handlers for opening, closing, saving, and deleting events
  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleSaveEvent = (event) => {
    saveEvent(event);
    setEvents(getEvents(currentDate)); // Refresh the events
    handleCloseModal();
  };

  const handleDeleteEvent = (event) => {
    deleteEvent(event);
    setEvents(getEvents(currentDate)); // Refresh the events
    handleCloseModal();
  };

  return (
    <div className="app">
      <h1>Event Calendar</h1>

      {/* Calendar controls for switching between months */}
      <div className="calendar-controls">
        <button onClick={handlePreviousMonth}>Previous</button>
        <span className="month-year">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      {/* Calendar component to display the calendar grid */}
      <Calendar
        currentDate={currentDate}
        events={events}
        onOpenModal={handleOpenModal}
      />

      {/* Event Modal for adding/editing events */}
      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;

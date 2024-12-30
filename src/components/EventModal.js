import React, { useState, useEffect } from "react";

const EventModal = ({ event, onSave, onDelete, onClose }) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setName(event.name || "");
      setStartTime(event.startTime || "");
      setEndTime(event.endTime || "");
      setDescription(event.description || "");
    }
  }, [event]);

  const handleSave = () => {
    const newEvent = { ...event, name, startTime, endTime, description };
    onSave(newEvent);
  };

  // Determine if the save button should be enabled
  const isSaveDisabled = !name || !startTime || !endTime;

  return (
    <div className="modal">
      <h2>{event ? "Edit Event" : "Add Event"}</h2>
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event name" />
      <label>Start Time</label>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <label>End Time</label>
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event description" />
      
      <div className="modal-actions">
        <button onClick={handleSave} disabled={isSaveDisabled}>
          Save
        </button>
        {event && (
          <button onClick={() => onDelete(event)} className="close">
            Delete
          </button>
        )}
        <button onClick={onClose} className="close">
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;

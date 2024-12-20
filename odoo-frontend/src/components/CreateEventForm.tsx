import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { convertLocalToUTC } from "./convertLocalToUTC";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateEventForm = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      eventData.date = convertLocalToUTC(eventData.date);
      
      console.log(eventData.date);

      const response = await axios.post(
        `${API_BASE_URL}/api/events`,
        eventData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Redirect or show success message
      navigate('/events/'); // Navigate back to events list
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-xl">Events</h1>
        <p>
          Create an event! -{" "}
          <a href="/events" className="text-blue-600">
            Back
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={eventData.name}
            onChange={(e) =>
              setEventData({ ...eventData, name: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              value={eventData.location}
              onChange={(e) =>
                setEventData({ ...eventData, location: e.target.value })
              }
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Date</label>
            <input
              type="datetime-local"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;

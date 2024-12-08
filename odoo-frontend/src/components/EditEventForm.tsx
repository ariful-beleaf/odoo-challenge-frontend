import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
}

interface EditEventFormProps {
  event: Event | null;
  onClose: () => void;
  onSubmit: (event: Event) => void;
}


const EditEventForm: React.FC<EditEventFormProps> = ({ event, onClose, onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState(
    event || {
      id: 0,
      name: '',
      location: '',
      date: '',
    }
  );


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");
        console.log('token', token);
        console.log('id', id);

        const response = await axios.get(
          `http://127.0.0.1:8069/api/events/${id}`,
          {
            headers: { 
              "Content-Type": "application/json" ,
              "Authorization" : `Bearer ${token}`,
              // "Access-Control-Allow-Origin":"*",
            },
          }
        );
        console.error(response);
        const eventData = response.data;
        const formattedDate = new Date(eventData.date)
          .toISOString()
          .slice(0, 16); // Format: YYYY-MM-DDTHH:mm

        setFormData({
          ...eventData,
          date: formattedDate
        });

        console.error('eventData', eventData);
      } catch (err) {
        setError('Failed to fetch event details');
        console.error('Error fetching event:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log('ID from URL:', id);
    try {
      await axios.put(
        `http://localhost:8069/api/events/${id}`,
        formData,
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleClose = () => {
    navigate('/events/'); // Navigate back to events list
  };

  const handleBack = () => {
    navigate('/events/'); // Navigate back to events list
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Edit Event</h2>
        <p className="text-xl">Edit an event - <button onClick={handleBack}>Back</button></p>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="event_id"
          type="hidden"
          value={formData.id}
        />
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;

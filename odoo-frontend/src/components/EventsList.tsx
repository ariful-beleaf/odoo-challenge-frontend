import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
}

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const indexOfLastEvent = currentPage * entriesPerPage;
  const indexOfFirstEvent = indexOfLastEvent - entriesPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / entriesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCreate = (id: number) => {
    console.log('Create form');
    window.location.href = `/events/create`;
  };

  const handleEdit = (id: number) => {
    console.log('Editing item:', id);
    window.location.href = `/events/edit/${id}`;
  };

  const handleDelete = async (id: number) => {
    console.log('Deleting item:', id);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/events/${id}`,
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      const result = response.data.result;

      // Check for various error scenarios
      if (result?.data?.error || result?.error) {
        const errorMessage = result.message || result.data?.error || "Authentication failed";
        setError(errorMessage);
        return;
      }

      console.log('Successfully deleted event');
      window.location.reload();
      
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(error)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {

      setIsLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      console.log(token);
      try{
        const response = await axios.get(
          `${API_BASE_URL}/api/events`,
          {
            headers: { 
              "Content-Type": "application/json" ,
              "Authorization" : `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.error) {
          console.error("Failed to fetch events");
        }
        setEvents(response.data.events);

        
      } catch(e) { console.error(e); }
        

    } catch (err) {
      console.error(err);
      console.error("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchEvents();
  }, []);

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 border rounded ${
            currentPage === i ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Events</h1>
          <p>List of events - <a href="/events/create" className="text-blue-600">Create</a></p>
        </div>
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>entries</span>
        </div>
      </div>
      {
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">NAME</th>
              <th className="py-2">LOCATION</th>
              <th className="py-2">TIME</th>
              <th className="py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{event.name}</td>
                <td className="py-2">{event.location}</td>
                <td className="py-2">{event.date}</td>
                <td className="py-2">
                  <button onClick={() => handleEdit(event.id)} className="text-blue-500 mr-2">Edit</button>
                  <button onClick={() => handleDelete(event.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {error && (
        <div className="text-red-500 p-4 mb-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          Showing {indexOfFirstEvent + 1} to{" "}
          {Math.min(indexOfLastEvent, events.length)} of {events.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          {renderPaginationNumbers()}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsList;

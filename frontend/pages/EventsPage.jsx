import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { getEvents } from "../api/Events";

export default function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events");
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.eventDate.split('T')[0] === dateStr);
  };

  const getFilteredEvents = () => {
    if (!selectedDate) return [];
    let filtered = getEventsForDate(selectedDate);
    if (selectedType !== "all") {
      filtered = filtered.filter(event => event.type.toLowerCase() === selectedType.toLowerCase());
    }
    return filtered;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const filteredEvents = getFilteredEvents();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 font-heading">Events & News Calendar</h1>
          <p className="text-gray-600 font-body">Click on a date to view events and news</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 font-heading">
                  {monthNames[month]} {year}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(year, month, day);
                  const dayEvents = getEventsForDate(date);
                  const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                  const isToday = new Date().toDateString() === date.toDateString();
                  
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`aspect-square p-2 rounded-lg border-2 transition relative ${
                        isSelected
                          ? 'bg-secondary text-white border-secondary'
                          : dayEvents.length > 0
                          ? 'bg-secondary/10 border-green-400 text-secondary font-semibold'
                          : isToday
                          ? 'border-secondary text-secondary font-bold'
                          : 'border-gray-200 hover:border-green-300 hover:bg-secondary/5'
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 font-heading">
                  {selectedDate ? formatDate(selectedDate) : 'Select a Date'}
                </h3>
              </div>

              {selectedDate && (
                <div className="mb-4">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  >
                    <option value="all">All</option>
                    <option value="event">Events</option>
                    <option value="news">News</option>
                  </select>
                </div>
              )}

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {!selectedDate ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Click on a date to view events</p>
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No events on this date</p>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.type === 'event' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-secondary/10 text-secondary'
                        }`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        {event.isUrgent && (
                          <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-bold">
                            URGENT
                          </span>
                        )}
                      </div>
                      
                      <h4 className="font-bold text-gray-800 mb-2">{event.title}</h4>
                      
                      {event.location && (
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </div>
                      )}
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-body">{event.description}</p>
                      
                      {event.videoUrl && (
                        <a
                          href={event.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-primary hover:text-primary text-sm font-medium mb-2"
                        >
                          📹 Watch Video
                        </a>
                      )}
                      
                      {event.content && (
                        <button 
                          onClick={() => navigate(`/events/${event.id}`)}
                          className="w-full bg-secondary text-white py-2 px-3 rounded-lg hover:bg-secondary/90 transition text-sm font-medium"
                        >
                          Read More
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/Events";
import { Calendar } from "lucide-react";

const LatestEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest News & Events</h2>
          <p className="text-gray-600">Stay updated with our upcoming activities and recent initiatives</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="border border-primary/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center text-secondary text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <Link to={`/events/${event.id}`} className="text-primary font-semibold hover:text-primary/80">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/events" className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary transition">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestEvents;



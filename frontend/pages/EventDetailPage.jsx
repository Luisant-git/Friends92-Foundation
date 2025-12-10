import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { getEvents } from "../api/Events";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const events = await getEvents();
      const foundEvent = events.find(e => e.id === parseInt(id));
      setEvent(foundEvent);
    } catch (error) {
      console.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <button
            onClick={() => navigate('/events')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {event.imageUrl && (
            <div className="w-full h-64 md:h-96">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                event.type === 'event' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-5 h-5 mr-2" />
                <span>{formatDate(event.eventDate)}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {event.title}
            </h1>

            {event.location && (
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{event.location}</span>
              </div>
            )}

            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>

              {event.content && (
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.content}
                </div>
              )}
            </div>

            {event.videoUrl && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Watch Video</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <a
                    href={event.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                Published on {formatDate(event.createdAt || event.eventDate)}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/event-card';
import { mockEvents } from '@/lib/data';
import { type Event } from '@/lib/data';

// This is a mock of what would be a user-specific list of registrations
const userRegisteredEventIds = ['1'];

export default function MyRegistrationsPage() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this data. Here we filter the mock data.
    const registered = mockEvents.filter(event => userRegisteredEventIds.includes(event.id));
    setMyEvents(registered);
  }, []);

  const handleUnregister = async (eventId: string) => {
    // Mock unregister logic
    setMyEvents(prev => prev.filter(e => e.id !== eventId));
    // Here you would also update the global state or refetch data
  };

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">My Registrations</h1>
        {myEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map(event => (
                     <EventCard
                        key={event.id}
                        event={event}
                        isRegistered={true}
                        onRegister={() => {}} // Should not be callable from this page
                        onUnregister={handleUnregister}
                    />
                ))}
            </div>
        ) : (
             <p className="text-muted-foreground">A list of events you are registered for will appear here.</p>
        )}
    </div>
  );
}

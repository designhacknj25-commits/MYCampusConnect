"use client";

import { useState, useMemo, useTransition } from 'react';
import { EventCard } from '@/components/event-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockEvents } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

async function registerForEvent(eventId: string) {
    await new Promise(res => setTimeout(res, 500));
    return { success: true };
}

async function unregisterFromEvent(eventId: string) {
    await new Promise(res => setTimeout(res, 500));
    return { success: true };
}

export default function StudentDashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isPending, startTransition] = useTransition();

  const [registeredEvents, setRegisteredEvents] = useState(['1']);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || event.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);

  const handleRegister = async (eventId: string) => {
    startTransition(async () => {
        const result = await registerForEvent(eventId);
        if (result.success) {
            setRegisteredEvents(prev => [...prev, eventId]);
            toast({ title: "Successfully Registered!", description: "You will be notified of any updates." });
        } else {
            toast({ variant: "destructive", title: "Registration Failed", description: "Please try again." });
        }
    });
  };

  const handleUnregister = async (eventId: string) => {
    startTransition(async () => {
        const result = await unregisterFromEvent(eventId);
        if (result.success) {
            setRegisteredEvents(prev => prev.filter(id => id !== eventId));
            toast({ title: "Successfully Unregistered" });
        } else {
            toast({ variant: "destructive", title: "Failed to Unregister", description: "Please try again." });
        }
    });
  };

  const categories = ['all', 'Workshop', 'Seminar', 'Social', 'Sports'];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search events..."
            className="w-full sm:w-64 bg-card/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] bg-card/50">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending && (
          <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      )}

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isRegistered={registeredEvents.includes(event.id)}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card/30 rounded-lg">
          <p className="text-muted-foreground">No events found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockEvents, type Event } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function ManageEventsPage() {
    const router = useRouter();
    // In a real app, you would fetch events created by the logged-in teacher.
    // Here we just use the mock data for demonstration.
    const [events, setEvents] = useState<Event[]>(mockEvents);

    const deleteEvent = (eventId: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(e => e.id !== eventId));
            // In a real app, you would also make an API call to delete the event.
        }
    };
    
    // Placeholder function, in a real app this would navigate to a page with participant info
    const viewParticipants = (eventId: string) => {
        const event = events.find(e => e.id === eventId);
        const participants = event?.participants.join(', ') || 'No participants yet.';
        alert(`Participants for ${event?.title}:\n${participants}`);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Events</h1>
                    <p className="text-muted-foreground">Edit, delete, and view participants for your events.</p>
                </div>
                <Button asChild>
                    <Link href="/teacher/events/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Event
                    </Link>
                </Button>
            </div>

            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map(event => (
                        <Card key={event.id} className="bg-card/50">
                            <CardHeader>
                                {event.poster && (
                                     <div className="relative h-48 w-full mb-4">
                                        <Image src={event.poster} alt={event.title} layout="fill" className="rounded-t-lg object-cover" />
                                    </div>
                                )}
                                <Badge variant="secondary" className="w-fit">{event.category}</Badge>
                                <CardTitle className="mt-2">{event.title}</CardTitle>
                                <CardDescription>{event.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Deadline:</strong> {new Date(event.deadline).toLocaleDateString()}</p>
                                <p><strong>Limit:</strong> {event.limit === 0 ? 'Unlimited' : `${event.participants.length} / ${event.limit}`}</p>
                            </CardContent>
                             <CardFooter className="flex flex-wrap gap-2">
                                <Button size="sm" variant="outline" onClick={() => router.push(`/teacher/events/edit/${event.id}`)}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteEvent(event.id)}>Delete</Button>
                                <Button size="sm" variant="secondary" onClick={() => viewParticipants(event.id)}>View Participants</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-card/30 rounded-lg">
                    <p className="text-muted-foreground">You haven&apos;t created any events yet.</p>
                     <Button asChild className="mt-4">
                        <Link href="/teacher/events/create">Create Your First Event</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}

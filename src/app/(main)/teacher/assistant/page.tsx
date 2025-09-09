"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUsers, type Notification } from "@/lib/data";

const getMyNotifications = (teacherEmail: string): Notification[] => {
    const users = getUsers();
    const teacher = users.find((u) => u.email === teacherEmail);
    return teacher ? teacher.notifications : [];
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    
    useEffect(() => {
        const teacherEmail = localStorage.getItem("userEmail");
        if (teacherEmail) {
            setNotifications(getMyNotifications(teacherEmail));
        }
    }, []);

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Inbox</h1>
        <p className="text-muted-foreground">Questions from students will appear here.</p>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Card key={notif.id} className="bg-card/50">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
                 <Avatar>
                    <AvatarFallback>{notif.from.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                     <p className="font-medium">{notif.from}</p>
                     <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notif.date), { addSuffix: true })}
                     </p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notif.message}</p>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 bg-card/30 rounded-lg">
            <p className="text-muted-foreground">No questions yet. Your inbox is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

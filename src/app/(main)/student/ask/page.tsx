"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock function to add a notification to a teacher
const addNotificationForTeacher = (teacherEmail: string, studentEmail: string, question: string) => {
  const users = JSON.parse(localStorage.getItem("cc_users_v2") || "[]");
  const teacher = users.find((u: any) => u.email === teacherEmail);
  if (teacher) {
    const newNotification = {
      id: `notif${Date.now()}`,
      from: studentEmail,
      message: question,
      date: new Date().toISOString(),
      read: false,
    };
    teacher.notifications.unshift(newNotification);
    localStorage.setItem("cc_users_v2", JSON.stringify(users));
    return true;
  }
  return false;
};

// Mock function to find the teacher of the most recent event the student registered for
const findMyTeacherEmail = (studentEmail: string) => {
    // This is a simplified logic. In a real app, you'd have a more robust way
    // of determining which teacher to contact. Here we just find the teacher
    // of any event the student is in. We'll use "teacher@test.com" as a fallback.
    return "teacher@test.com";
}

const askSchema = z.object({
  question: z.string().min(10, "Please ask a more detailed question."),
});

export default function AskTeacherPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof askSchema>>({
    resolver: zodResolver(askSchema),
    defaultValues: { question: "" },
  });

  function onSubmit(values: z.infer<typeof askSchema>) {
    startTransition(() => {
      try {
        const studentEmail = localStorage.getItem('userEmail');
        if (!studentEmail) throw new Error("Student not logged in.");

        // For this prototype, we'll assume the student is asking the main teacher.
        // A real app might have a dropdown to select a course/teacher.
        const teacherEmail = findMyTeacherEmail(studentEmail);

        if (teacherEmail) {
            const success = addNotificationForTeacher(teacherEmail, studentEmail, values.question);
            if (success) {
                toast({
                    title: "Question Sent!",
                    description: "Your teacher has been notified and will get back to you.",
                });
                form.reset();
            } else {
                 throw new Error("Could not find the teacher to notify.");
            }
        } else {
            throw new Error("You are not registered for any events, so there is no teacher to ask.");
        }

      } catch (error: any) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Failed to Send",
          description: error.message || "Could not send your question. Please try again later.",
        });
      }
    });
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Send className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Ask a Question</CardTitle>
              <CardDescription>Your question will be sent to your teacher as a notification.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have a question about the upcoming assignment...'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send Question
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

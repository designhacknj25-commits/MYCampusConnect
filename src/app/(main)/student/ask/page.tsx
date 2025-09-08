"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { answerStudentQuestion, type TeacherAssistantFAQInput } from "@/ai/flows/teacher-assistant-faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { mockFaqs } from "@/lib/data";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const askSchema = z.object({
  question: z.string().min(10, "Please ask a more detailed question."),
});

export default function AskTeacherPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState<string | null>(null);

  const form = useForm<z.infer<typeof askSchema>>({
    resolver: zodResolver(askSchema),
    defaultValues: { question: "" },
  });

  function onSubmit(values: z.infer<typeof askSchema>) {
    setAnswer(null);
    startTransition(async () => {
      try {
        const input: TeacherAssistantFAQInput = {
          question: values.question,
          faqItems: mockFaqs,
        };
        const result = await answerStudentQuestion(input);
        setAnswer(result.answer);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "AI Assistant Error",
          description: "Could not get an answer. Please try again later.",
        });
      }
    });
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Ask the AI Teacher's Assistant</CardTitle>
              <CardDescription>Get instant answers to your questions.</CardDescription>
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
                        placeholder="e.g., 'What topics will be covered in the midterm?'"
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
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Ask Assistant
              </Button>
            </form>
          </Form>

          {(isPending || answer) && (
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Answer:</h3>
              <div className="rounded-lg border bg-background/50 p-4 min-h-[100px]">
                {isPending ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <p className="text-foreground leading-relaxed">{answer}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

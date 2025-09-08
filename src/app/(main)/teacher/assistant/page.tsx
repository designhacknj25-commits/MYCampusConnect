"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockFaqs, type FAQ } from "@/lib/data";
import { FaqItem } from "@/components/faq-item";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

const faqSchema = z.object({
  question: z.string().min(1, "Question is required."),
  answer: z.string().min(1, "Answer is required."),
});

export default function AssistantPage() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>(mockFaqs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const form = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: "", answer: "" },
  });

  const handleOpenDialog = (faq: FAQ | null = null) => {
    setEditingFaq(faq);
    form.reset(faq ? { question: faq.question, answer: faq.answer } : { question: "", answer: "" });
    setIsDialogOpen(true);
  };

  const handleDelete = (faqId: string) => {
    setFaqs(faqs.filter(f => f.id !== faqId));
    toast({ title: "FAQ Deleted" });
  };
  
  function onSubmit(values: z.infer<typeof faqSchema>) {
    if (editingFaq) {
      setFaqs(faqs.map(f => f.id === editingFaq.id ? { ...editingFaq, ...values } : f));
      toast({ title: "FAQ Updated" });
    } else {
      const newFaq = { id: `faq${Date.now()}`, ...values };
      setFaqs([...faqs, newFaq]);
      toast({ title: "FAQ Added" });
    }
    setIsDialogOpen(false);
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant FAQs</h1>
          <p className="text-muted-foreground">Manage the frequently asked questions for the AI to use.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg">
            <DialogHeader>
              <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">{editingFaq ? 'Save Changes' : 'Add FAQ'}</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {faqs.length > 0 ? faqs.map(faq => (
          <FaqItem key={faq.id} faq={faq} onEdit={handleOpenDialog} onDelete={handleDelete} />
        )) : (
          <div className="text-center py-16 bg-card/30 rounded-lg">
            <p className="text-muted-foreground">No FAQs created yet. Add one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

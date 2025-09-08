'use server';

/**
 * @fileOverview Implements an AI-powered question answering tool for teachers, utilizing pre-populated FAQs.
 *
 * - answerStudentQuestion - A function that answers student questions using provided FAQs.
 * - TeacherAssistantFAQInput - The input type for the answerStudentQuestion function.
 * - TeacherAssistantFAQOutput - The return type for the answerStudentQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TeacherAssistantFAQInputSchema = z.object({
  question: z.string().describe('The student\u2019s question.'),
  faqItems: z
    .array(z.object({question: z.string(), answer: z.string()}))
    .describe('An array of frequently asked questions and their answers.'),
});
export type TeacherAssistantFAQInput = z.infer<typeof TeacherAssistantFAQInputSchema>;

const TeacherAssistantFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the student\u2019s question.'),
});
export type TeacherAssistantFAQOutput = z.infer<typeof TeacherAssistantFAQOutputSchema>;

export async function answerStudentQuestion(input: TeacherAssistantFAQInput): Promise<TeacherAssistantFAQOutput> {
  return teacherAssistantFAQFlow(input);
}

const prompt = ai.definePrompt({
  name: 'teacherAssistantFAQPrompt',
  input: {
    schema: TeacherAssistantFAQInputSchema,
  },
  output: {
    schema: TeacherAssistantFAQOutputSchema,
  },
  prompt: `You are a teacher's assistant. A student has asked the following question: {{{question}}}.

You have access to the following frequently asked questions and answers:
{{#each faqItems}}
Question: {{{this.question}}}
Answer: {{{this.answer}}}
{{/each}}

Using the FAQs and your own knowledge, answer the student's question.
`,
});

const teacherAssistantFAQFlow = ai.defineFlow(
  {
    name: 'teacherAssistantFAQFlow',
    inputSchema: TeacherAssistantFAQInputSchema,
    outputSchema: TeacherAssistantFAQOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

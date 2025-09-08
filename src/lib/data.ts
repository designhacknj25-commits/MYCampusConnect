export type Event = {
  id: string;
  title: string;
  description: string;
  category: 'Workshop' | 'Seminar' | 'Social' | 'Sports';
  date: string;
  deadline: string;
  limit: number;
  poster: string;
  teacherEmail: string;
  participants: string[]; // array of student emails
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Next.js for Beginners',
    description: 'A hands-on workshop covering the fundamentals of Next.js 14. Learn about App Router, Server Components, and more!',
    category: 'Workshop',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    limit: 25,
    poster: 'https://picsum.photos/seed/event1/600/400',
    teacherEmail: 'teacher@test.com',
    participants: ['student@test.com'],
  },
  {
    id: '2',
    title: 'AI in Modern Web Development',
    description: 'Explore how Generative AI is changing the landscape of web development. Guest lecture by industry experts.',
    category: 'Seminar',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    limit: 100,
    poster: 'https://picsum.photos/seed/event2/600/400',
    teacherEmail: 'teacher@test.com',
    participants: [],
  },
  {
    id: '3',
    title: 'Campus Spring Social',
    description: 'Join us for an evening of music, food, and fun! A great way to meet new people and relax before exams.',
    category: 'Social',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    limit: 200,
    poster: 'https://picsum.photos/seed/event3/600/400',
    teacherEmail: 'teacher@test.com',
    participants: [],
  },
  {
    id: '4',
    title: 'Introduction to Figma',
    description: 'Learn the basics of UI/UX design with Figma. No prior experience required.',
    category: 'Workshop',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    limit: 10,
    poster: 'https://picsum.photos/seed/event4/600/400',
    teacherEmail: 'teacher@test.com',
    participants: Array.from({ length: 10 }, (_, i) => `student${i + 2}@test.com`),
  },
];

export const mockFaqs: FAQ[] = [
  {
    id: 'faq1',
    question: 'What is the deadline for project submission?',
    answer: 'The final project deadline is May 15th at 11:59 PM. No late submissions will be accepted.',
  },
  {
    id: 'faq2',
    question: 'Where can I find the course materials?',
    answer: 'All course materials, including lecture slides and recordings, are available on the "Materials" tab of the course portal.',
  },
  {
    id: 'faq3',
    question: 'How are grades calculated?',
    answer: 'Grades are based on assignments (40%), a midterm exam (25%), a final project (30%), and participation (5%).',
  }
];

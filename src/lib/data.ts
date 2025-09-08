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

// This function will be the single source of truth for getting events
export const getMockEvents = (): Event[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const events = localStorage.getItem('cc_events_v1');
  return events ? JSON.parse(events) : [];
}

// This function will be used to save events
export const saveMockEvents = (events: Event[]) => {
    if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem('cc_events_v1', JSON.stringify(events));
}


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

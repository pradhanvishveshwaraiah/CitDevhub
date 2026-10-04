export interface EventItem {
  id: string;
  title: string;
  type: 'hackathon' | 'debate' | 'workshop' | 'meetup';
  status: 'upcoming' | 'past' | 'coming-soon';
  date: string;
  time: string;
  location: string;
  shortDesc: string;
  fullDesc: string;
  speakers?: Array<{
    name: string;
    role: string;
    avatar?: string;
  }>;
  topics?: string[];
  recap?: {
    attendees: number;
    winner?: string;
    keyTakeaway: string;
    highlights: string[];
  };
  registrationOpen?: boolean;
  totalSeats?: number;
  seatsTaken?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  specialty: string[];
  department: string;
  college: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  isLead?: boolean;
  image?: string;
}

export interface CollabProject {
  id: string;
  title: string;
  description: string;
  category: 'AI / ML' | 'Web3' | 'Fullstack' | 'DevOps' | 'Mobile';
  leadStudent: string;
  openRoles: string[];
  stars: number;
  tags: string[];
  githubUrl: string;
  status: 'Active Build' | 'Seeking Contributors' | 'Shipped';
}

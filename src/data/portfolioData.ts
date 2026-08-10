import {
  OwnerProfile,
  Project,
  Skill,
  Experience,
  Certification,
  Education,
} from '../types';

export const initialOwnerProfile: OwnerProfile = {
  name: 'Balaji Harihara Sudhan A',
  title: 'Software Engineer | MERN Stack Developer | Java Developer | AI & DS Student',
  location: 'Chennai, India',
  email: 'bala3507563@gmail.com',
  phone: '+91 7010172563',
  linkedin: 'https://linkedin.com/in/balajihariharasudhana',
  github: 'https://github.com/BalajiHariharasudhan',
  objective:
    'Aspiring Software Development Engineer pursuing a B.Tech in Artificial Intelligence and Data Science, with hands-on experience building full-stack web applications using the MERN stack and JavaScript. Completed a full-stack development internship and multiple independent projects; actively solving DSA problems on LeetCode, HackerRank, and Skillrack. Seeking an entry-level SDE role.',
  currentlyLearning: ['MERN Stack', 'System Design', 'Java', 'Spring Boot', 'DSA', 'Cloud Computing'],
  codingProfiles: [
    {
      platform: 'LeetCode',
      username: 'BalajiHariharasudhan',
      url: 'https://leetcode.com/u/BalajiHariharasudhan/',
      stats: 'Active Problem Solver (Arrays, Strings, Linked Lists, Trees)',
      icon: 'Code2',
    },
    {
      platform: 'HackerRank',
      username: 'bala3507563',
      url: 'https://www.hackerrank.com/profile/bala3507563',
      stats: 'Problem Solving & Java Badges',
      icon: 'Terminal',
    },
    {
      platform: 'Skillrack',
      username: 'Balaji Harihara Sudhan A',
      url: 'https://www.skillrack.com/',
      stats: 'Daily Coding & Algorithmic Practice',
      icon: 'Cpu',
    },
    {
      platform: 'GitHub',
      username: 'BalajiHariharasudhan',
      url: 'https://github.com/BalajiHariharasudhan',
      stats: 'Open Source Repositories & Full Stack Apps',
      icon: 'Github',
    },
    {
      platform: 'LinkedIn',
      username: 'balajihariharasudhana',
      url: 'https://linkedin.com/in/balajihariharasudhana',
      stats: 'Networking & Professional Portfolio',
      icon: 'Linkedin',
    },
  ],
  stats: {
    projectsCompleted: 3,
    problemsSolved: '250+',
    hackathons: '2+',
    certificationsCount: 2,
  },
};

export const initialProjects: Project[] = [
  {
    id: 'mern-task-manager',
    title: 'MERN Task Manager',
    description:
      'Full-stack task management web application with CRUD operations, task status tracking, and persistent RESTful API integration.',
    longDescription:
      'A comprehensive productivity suite designed to organize workflow and task lifecycles. Built during internship at Approtech R&D Solutions. Includes RESTful APIs developed in Node.js/Express.js, interactive state handling in React.js, and persistent document storage using MongoDB.',
    techBadges: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/BalajiHariharasudhan/MERN-Task-Manager',
    liveDemoUrl: 'https://github.com/BalajiHariharasudhan/MERN-Task-Manager',
    features: [
      'Create, view, update, and track status of daily tasks seamlessly',
      'RESTful Express.js routes connected to MongoDB Mongoose schemas',
      'Interactive filtering by completion status, priority, and date created',
      'Responsive full-stack dashboard with real-time UI feedback',
    ],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    category: 'Full Stack',
    featured: true,
    views: 142,
    createdAt: '2025-01-15',
  },
  {
    id: 'instagram-clone',
    title: 'Instagram Clone',
    description:
      'Responsive frontend replica of Instagram core UI featuring component-based feed, profile views, and JSON Server mock backend.',
    longDescription:
      'A high-fidelity social media interface built to master component-driven React architecture and state management. Emulates post feeds, like buttons, comment drawers, and user profiles with smooth responsiveness.',
    techBadges: ['React.js', 'JavaScript', 'CSS3', 'JSON Server', 'Component Architecture'],
    githubUrl: 'https://github.com/BalajiHariharasudhan/Instagram-Clone',
    liveDemoUrl: 'https://github.com/BalajiHariharasudhan/Instagram-Clone',
    features: [
      'Component-driven architecture mirroring Instagram UI layout',
      'Dynamic feed rendering with post likes, comments, and story avatars',
      'JSON Server integration for realistic client-side asynchronous data fetching',
      'Responsive mobile-first navigation and desktop sidebar views',
    ],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80',
    category: 'Frontend',
    featured: true,
    views: 98,
    createdAt: '2024-11-10',
  },
  {
    id: 'booksky',
    title: 'BookSky',
    description:
      'Interactive web application for cataloging books, adding custom reviews, and managing personal libraries with vanilla DOM manipulation.',
    longDescription:
      'An intuitive book management web utility developed with core web standards (HTML, CSS, Vanilla JS). Allows users to dynamically append book titles, author details, and short descriptions to an active digital bookshelf using DOM events.',
    techBadges: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'Local Storage'],
    githubUrl: 'https://github.com/BalajiHariharasudhan/BookSky',
    liveDemoUrl: 'https://github.com/BalajiHariharasudhan/BookSky',
    features: [
      'Modal popup form to easily register new book entries',
      'Instant DOM update without page reload upon adding or deleting books',
      'Clean typography and card layout for comfortable reading',
      'Vanilla JavaScript event handling and state preservation',
    ],
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80',
    category: 'DOM/JS',
    featured: true,
    views: 115,
    createdAt: '2024-08-05',
  },
];

export const initialSkills: Skill[] = [
  // Programming
  { id: 's1', name: 'Java', category: 'Programming', iconName: 'Coffee', proficiency: 85, level: 'Advanced' },
  { id: 's2', name: 'JavaScript (ES6+)', category: 'Programming', iconName: 'FileCode', proficiency: 90, level: 'Advanced' },
  
  // Web Development
  { id: 's3', name: 'React.js', category: 'Web Development', iconName: 'Atom', proficiency: 88, level: 'Advanced' },
  { id: 's4', name: 'Node.js', category: 'Web Development', iconName: 'Server', proficiency: 82, level: 'Intermediate' },
  { id: 's5', name: 'Express.js', category: 'Web Development', iconName: 'Cpu', proficiency: 84, level: 'Intermediate' },
  { id: 's6', name: 'HTML5 & CSS3', category: 'Web Development', iconName: 'Layout', proficiency: 92, level: 'Advanced' },
  { id: 's7', name: 'Tailwind CSS', category: 'Web Development', iconName: 'Palette', proficiency: 88, level: 'Advanced' },
  
  // Databases
  { id: 's8', name: 'MongoDB', category: 'Databases', iconName: 'Database', proficiency: 82, level: 'Intermediate' },
  { id: 's9', name: 'JSON-based Data Stores', category: 'Databases', iconName: 'FileJson', proficiency: 90, level: 'Advanced' },

  // DSA
  { id: 's10', name: 'Data Structures & Algorithms', category: 'DSA', iconName: 'Binary', proficiency: 80, level: 'Intermediate' },
  { id: 's11', name: 'Problem Solving (LeetCode/HackerRank)', category: 'DSA', iconName: 'Brain', proficiency: 85, level: 'Advanced' },

  // Tools
  { id: 's12', name: 'Git & GitHub', category: 'Tools', iconName: 'GitBranch', proficiency: 88, level: 'Advanced' },
  { id: 's13', name: 'VS Code', category: 'Tools', iconName: 'Code', proficiency: 95, level: 'Expert' },

  // Soft Skills
  { id: 's14', name: 'Leadership', category: 'Soft Skills', iconName: 'Users', proficiency: 85, level: 'Advanced' },
  { id: 's15', name: 'Communication', category: 'Soft Skills', iconName: 'MessageSquare', proficiency: 88, level: 'Advanced' },
  { id: 's16', name: 'Teamwork & Collaboration', category: 'Soft Skills', iconName: 'Handshake', proficiency: 90, level: 'Advanced' },
  { id: 's17', name: 'Critical Thinking', category: 'Soft Skills', iconName: 'Lightbulb', proficiency: 85, level: 'Advanced' },
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Development Intern',
    company: 'Approtech R&D Solutions',
    location: 'Chennai, India',
    period: 'Recent Internship',
    type: 'Internship',
    responsibilities: [
      'Built a MERN Task Manager application enabling users to create, update, and track tasks using React.js for the frontend and Node.js/Express.js with MongoDB for the backend.',
      'Implemented RESTful API endpoints to handle full CRUD operations between the client interface and MongoDB database layer.',
      'Collaborated closely with engineering team members on feature development, code reviews, and debugging in an agile full-stack environment.',
      'Followed industry standard practices for modular code structure, environment variable handling, and state management.',
    ],
    techUsed: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs', 'Git'],
    isCurrent: false,
  },
];

export const initialCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Oracle AI Foundation Certification',
    issuer: 'Oracle',
    date: '2024',
    badgeColor: 'from-amber-500 to-orange-600',
    highlight: 'Certified foundational proficiency in AI algorithms, machine learning concepts, and cloud AI architecture.',
    credUrl: 'https://education.oracle.com/',
  },
  {
    id: 'cert-2',
    title: 'NPTEL "Python for Data Science" — Silver Medalist',
    issuer: 'NPTEL (Project Category)',
    date: '2024',
    badgeColor: 'from-slate-300 to-slate-400',
    highlight: 'Awarded Silver Medalist distinction in Python for Data Science project evaluation.',
    credUrl: 'https://nptel.ac.in/',
  },
  {
    id: 'cert-3',
    title: 'Second Prize, Best Competitor',
    issuer: 'Coding & Innovation Hackathon Club',
    date: '2024',
    badgeColor: 'from-blue-500 to-indigo-600',
    highlight: 'Secured 2nd Prize for outstanding technical execution, rapid prototyping, and algorithmic problem solving.',
    credUrl: '#',
  },
];

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech, Artificial Intelligence and Data Science',
    institution: "St. Joseph's College of Engineering",
    location: 'Chennai, India',
    period: '2024 - Expected 2028',
    details: 'Pursing undergraduate degree focused on AI, Data Science, Data Structures & Algorithms, Database Systems, and Full-Stack Engineering.',
    highlights: [
      'Active Member of NSDC–SJCE Student Chapter',
      'Active participant in hackathons, coding competitions, and technical presentations',
      'Building core strength in DSA, Java, MERN Stack, and Machine Learning concepts',
    ],
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary (Class XII)',
    institution: 'PTK Matriculation Higher Secondary School',
    location: 'Tamil Nadu, India',
    period: 'Completed 2024',
    details: 'Completed Higher Secondary education with focus on Mathematics, Physics, Chemistry, and Computer Science.',
    highlights: [
      'Strong academic performance in Computer Science and Mathematics',
      'Demonstrated leadership in school science and computing clubs',
    ],
  },
];

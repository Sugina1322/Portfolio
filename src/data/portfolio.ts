import droidsentinelPoster from '../assets/droidsentinel-poster.svg';
import lumiPoster from '../assets/lumi-poster.svg';
import savorlyPoster from '../assets/savorly-poster.svg';
import smartbinPoster from '../assets/smartbin-poster.svg';
import symbiPredictPoster from '../assets/symbipredict-poster.svg';

export const homeIntro = {
  lineOne: 'code',
  lineOneAccent: 'with',
  lineTwo: 'sap',
  lineTwoAccent: 'security',
  lineThree: 'abap discipline and systems built to earn trust',
  headline1:
    'BS Information Technology graduate applying cybersecurity, SAP security administration, ABAP fundamentals, and software development to build dependable products.',
  headline2:
    'From predictive healthcare and mobile experiences to Android hardening with DroidSentinel, I focus on clarity, auditability, and work that holds up under real use.',
  role: 'SAP Security Administrator - ABAP - Cybersecurity',
  bio: 'SAP Certified Associate - Security Administrator. Accenture Academy ABAP Developer. Oracle AI Vector Search certified.',
} as const;

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/jean-cristian-mangaser-b9611b2b9/',
  github: 'https://github.com/sugina1322',
  email: 'jeancristian0803@gmail.com',
  facebook: 'https://www.facebook.com/jeancristian.mangaser',
};

export const metrics = [
  {
    value: 'SAP',
    label: 'Security Administrator',
    detail: 'Certified on SAP S/4HANA security administration with ABAP exposure through Accenture Academy.',
  },
  {
    value: 'ABAP',
    label: 'Enterprise foundation',
    detail: 'Grounded in SAP SD, HR, Financial Controlling, and security-aware enterprise workflows.',
  },
  {
    value: '04',
    label: 'Signature builds',
    detail: 'Healthcare ML, mobile products, and Android security tooling across distinct problem spaces.',
  },
] as const;

export const certifications = [
  {
    name: 'SAP Certified Associate - Security Administrator - SAP',
    highlight: true,
  },
  {
    name: 'Oracle AI Vector Search Certified Professional - Oracle',
    highlight: false,
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate - Oracle',
    highlight: false,
  },
  {
    name: 'Fortinet Certified Fundamentals in Cybersecurity - Fortinet',
    highlight: false,
  },
  {
    name: 'Fortinet Certified Associate in Cybersecurity - Fortinet',
    highlight: false,
  },
  {
    name: 'Ethical Hacker - Cisco',
    highlight: false,
  },
] as const;

export const featuredProjects = [
  {
    title: 'SmartBin',
    year: '2025',
    tag: 'IoT Waste Management',
    accent: 'cyan',
    poster: smartbinPoster,
    description:
      'An IoT-based waste monitoring system using ESP32, ultrasonic sensors, Bluetooth BLE, and a custom mobile application to detect bin fill levels in real time and send collection alerts.',
    stack: ['ESP32', 'Ultrasonic Sensors', 'BLE', 'Mobile App'],
    highlight: 'Real-time fill alerts, community deployment',
  },
  {
    title: 'DroidSentinel',
    year: '2025',
    tag: 'Android Security',
    accent: 'slate',
    poster: droidsentinelPoster,
    href: 'https://github.com/Sugina1322/DroidSentinel',
    description:
      'Windows desktop Android security hardening console powered by ADB. Audits telemetry-heavy packages, reviews sensitive permissions, applies hardening actions, configures Private DNS, and exports JSON/HTML reports.',
    stack: ['Electron', 'JavaScript', 'ADB', 'Node.js'],
    highlight: 'Telemetry audit, permission review, Private DNS',
  },
  {
    title: 'SymbiPredict',
    year: '2025',
    tag: 'AI + Healthcare',
    accent: 'violet',
    poster: symbiPredictPoster,
    description:
      'Machine-learning system for symptom-based disease detection and outbreak forecasting using historical health patterns, built to support proactive healthcare decisions in the Philippines.',
    stack: ['Python', 'scikit-learn', 'Streamlit', 'Prophet'],
    highlight: 'Disease prediction, outbreak detection, forecasting',
  },
  {
    title: 'Lumi',
    year: '2026',
    tag: 'Travel Companion',
    accent: 'cyan',
    poster: lumiPoster,
    description:
      'Travel companion app for route planning, budget tracking, expense logging, and saved places in a calmer, more usable mobile flow.',
    stack: ['Expo Router', 'React Native', 'Supabase', 'Google Routes API'],
    highlight: 'Route planning, budget tracking, saved places',
  },
  {
    title: 'Savorly',
    year: '2026',
    tag: 'Food Discovery',
    accent: 'gold',
    poster: savorlyPoster,
    description:
      'Recipe and meal planning product focused on discovery, saved collections, and an inviting mobile-first experience for everyday food decisions.',
    stack: ['Expo Router', 'TypeScript', 'React Native', 'Supabase'],
    highlight: 'Recipe discovery, curation, mobile-first UX',
  },
] as const;

export const skillGroups = [
  {
    title: 'Cybersecurity & IT Security',
    copy: 'Security work spans ethical hacking, penetration testing, vulnerability assessment, Kali Linux, and practical security thinking.',
    items: [
      'Ethical Hacking',
      'Penetration Testing',
      'Vulnerability Assessment',
      'Kali Linux',
      'IT Security',
    ],
  },
  {
    title: 'Programming & Development',
    copy: 'Development experience covers Python, Java, ABAP basics, Flutter, web foundations, and mobile development with Ionic React and Angular.',
    items: [
      'Python',
      'Java',
      'ABAP Basic',
      'Dart / Flutter',
      'HTML / CSS / PHP',
      'Ionic React',
      'Angular',
    ],
  },
  {
    title: 'Database & SAP',
    copy: 'Enterprise fundamentals include MySQL, Oracle 10g, SAP S/4HANA Security Administration, SAP SD, SAP HR, Financial Controlling, and ABAP programming.',
    items: [
      'MySQL',
      'Oracle 10g',
      'SAP S/4HANA',
      'SAP Security Administration',
      'SAP Sales & Distribution',
      'SAP HR',
      'Financial Controlling',
    ],
  },
  {
    title: 'Design & Soft Skills',
    copy: 'Creative and collaboration skills include Canva, Figma, leadership, teamwork, critical thinking, adaptability, and communication.',
    items: [
      'Canva',
      'Figma',
      'Leadership',
      'Teamwork',
      'Critical Thinking',
      'Adaptability',
      'Communication',
    ],
  },
] as const;

export const processSteps = [
  {
    id: '01',
    title: 'Understand the system first',
    body: 'Whether it is SAP access control, mobile UX, or Android hardening, I start by mapping risk, dependencies, and what the user actually needs to trust.',
  },
  {
    id: '02',
    title: 'Build with clarity',
    body: 'I shape interfaces and workflows so permissions, data paths, and product intent stay readable instead of hidden behind decoration.',
  },
  {
    id: '03',
    title: 'Verify before shipping',
    body: 'Testing, review, and careful rollout matter - especially when security posture, enterprise behavior, or user trust is on the line.',
  },
] as const;

export const aboutCopy = {
  pullquote: 'Jean. Cybersecurity. Breaker of things, builder of worlds.',
  paragraphs: [
    "I got into this field because I'm obsessed with how things work - and the fastest way to understand something is to take it apart.",
    'I am a BS Information Technology graduate from the Technological Institute of the Philippines, Quezon City, building around cybersecurity, SAP, and software development.',
    'I want an opportunity where I can apply IT, cybersecurity, SAP, and development knowledge while continuously learning and contributing to the growth of an organization.',
  ],
  signals: ['Cybersecurity', 'SAP', 'Software Development', 'Builder of Worlds'],
} as const;

export const experienceEntries = [
  {
    date: '2026',
    role: 'BS Information Technology Graduate',
    company: 'Technological Institute of the Philippines - Quezon City',
    detail:
      'Built a foundation across cybersecurity, software development, systems analysis, and practical product work.',
  },
  {
    date: 'Nov 2025 - 2026',
    role: 'SAP Certified Associate - Security Administrator',
    company: 'SAP',
    detail:
      'Certified in SAP S/4HANA security administration, with focus on access, enterprise workflows, and security administration fundamentals.',
  },
  {
    date: '2025',
    role: 'SAP - Accenture Academy ABAP Developer',
    company: 'Accenture Academy',
    detail:
      'Trained in ABAP fundamentals with exposure to SAP SD, HR, Financial Controlling, and security-aware enterprise logic.',
  },
  {
    date: 'Feb 2024',
    role: 'E-Rovoutika Data Analytics',
    company: 'Unit 703 Parc House 21, EDSA Guadalupe Nuevo Makati City',
    detail:
      'Attended data analytics training, adding data interpretation and analytical thinking to the technical foundation.',
  },
  {
    date: 'Oct - Nov 2025',
    role: 'Cybersecurity Certification Tracks',
    company: 'Fortinet / Cisco / Oracle',
    detail:
      'Completed cybersecurity, ethical hacking, cloud foundations, and Oracle AI Vector Search certification tracks.',
  },
  {
    date: '2022 - 2023',
    role: "Dean's Lister Academic Scholar",
    company: 'Technological Institute of the Philippines, Quezon City',
    detail:
      "Recognized as a Dean's Lister Academic Scholar during the second semester.",
  },
] as const;

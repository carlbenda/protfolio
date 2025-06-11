import { Project, UserInfo, AdminCredentials } from './types';

export const INITIAL_USER_INFO: UserInfo = {
  name: "Mursalin Irfan",
  title: "Professional Web Developer",
  github: "https://github.com/carlbenda",
  linkedin: "https://www.linkedin.com/in/mursalin-irfan-044675363/",
  email: "mursalinirfan25@gmail.com",
  profileImage: "data:image/png;base64,PLACEHOLDER_FOR_YOUR_BASE64_IMAGE_STRING_REPLACE_THIS", // Replace with actual base64 image
  bio: "A passionate and dedicated web developer with experience in creating dynamic and responsive web applications. I specialize in front-end technologies like React & Next.js, and backend with Python & Django. Always eager to learn and implement new solutions to build intuitive user experiences. My goal is to leverage my skills to contribute to innovative projects and create impactful digital products."
};

export const SKILLS_LIST = [
  "React", "TypeScript", "JavaScript (ES6+)", "Python", "Django", "Node.js", 
  "Tailwind CSS", "HTML5 & CSS3", "Git & GitHub", "REST APIs", 
  "Responsive Design", "Frontend Architecture"
];

export const SECTION_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  PROJECTS: 'projects',
  CONTACT: 'contact',
  ADMIN: 'admin', 
};

export const NAV_LINKS = [
  { name: 'Home', href: `#${SECTION_IDS.HOME}` },
  { name: 'About', href: `#${SECTION_IDS.ABOUT}` },
  { name: 'Projects', href: `#${SECTION_IDS.PROJECTS}` },
  { name: 'Contact', href: `#${SECTION_IDS.CONTACT}` },
];

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce website with product listings, cart functionality, and user authentication. Built with React and Node.js. This platform allows users to browse products, add items to their cart, and securely checkout. It features a responsive design, ensuring a seamless experience across all devices. The backend is powered by Node.js and Express, with MongoDB for data storage, providing a robust and scalable solution. User accounts are managed with JWT authentication.',
    imageUrls: ['https://picsum.photos/seed/ecom1/1920/1080', 'https://picsum.photos/seed/ecom2/1920/1080', 'https://picsum.photos/seed/ecom3/1920/1080'],
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'JWT'],
    liveUrl: '#',
    repoUrl: 'https://github.com/carlbenda/ecommerce-example',
  },
  {
    id: 'proj2',
    title: 'Task Management App',
    description: 'A collaborative task management tool to help teams organize and track their work effectively. Features include drag-and-drop boards (similar to Trello), real-time updates using WebSockets, task assignments, due dates, and progress tracking. Built with Vue.js and Firebase for real-time database and authentication. The UI is designed with Vuetify for a clean Material Design look.',
    imageUrls: ['https://picsum.photos/seed/taskapp1/1920/1080', 'https://picsum.photos/seed/taskapp2/1920/1080'],
    tags: ['Vue.js', 'Firebase', 'Vuetify', 'WebSockets'],
    liveUrl: '#',
    repoUrl: 'https://github.com/carlbenda/task-manager-vue',
  },
  {
    id: 'proj3',
    title: 'Personal Portfolio V2',
    description: 'An enhanced version of my personal portfolio, showcasing advanced animations, a blog section powered by a headless CMS (like Strapi or Sanity), and improved performance using Next.js for Server-Side Rendering (SSR) and Static Site Generation (SSG). TypeScript is used for better code quality and maintainability. GraphQL is utilized for querying blog data. Styled with Emotion CSS for component-level styling.',
    imageUrls: ['https://picsum.photos/seed/portfolio1/1920/1080', 'https://picsum.photos/seed/portfolio2/1920/1080', 'https://picsum.photos/seed/portfolio3/1920/1080', 'https://picsum.photos/seed/portfolio4/1920/1080'],
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Emotion CSS', 'Headless CMS', 'SSR'],
    repoUrl: 'https://github.com/carlbenda/portfolio-nextjs',
  },
];

export const ADMIN_CREDENTIALS: AdminCredentials = {
  username: "Tawhid",
  password: "Sadia22Irfan25@#"
};
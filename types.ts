export interface Project {
  id: string; 
  title: string;
  description: string;
  imageUrls: string[]; 
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface UserInfo {
  name: string;
  title: string;
  github: string;
  linkedin: string;
  email: string;
  profileImage: string;
  bio: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
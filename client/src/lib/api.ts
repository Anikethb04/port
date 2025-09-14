import { apiRequest } from "./queryClient";

// Sample user ID - in a real app this would come from authentication
export const SAMPLE_USER_ID = "062ef456-e7c1-4297-be4a-787461539af3";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  demoLink: string | null;
  codeLink: string | null;
  featured: boolean;
  sortOrder: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  sortOrder: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  sortOrder: number;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  profileImage: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduation: string | null;
  gpa: string | null;
  description: string | null;
}

export interface Coursework {
  id: string;
  course: string;
  color: string;
}

export interface Interest {
  id: string;
  label: string;
  icon: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface CompletePortfolio {
  profile: Profile | null;
  projects: Project[];
  skillCategories: SkillCategory[];
  education: Education[];
  coursework: Coursework[];
  interests: Interest[];
  socialLinks: SocialLink[];
}

// API functions
export async function fetchCompletePortfolio(userId: string): Promise<CompletePortfolio> {
  const response = await apiRequest("GET", `/api/portfolio/${userId}`);
  return response.json();
}

export async function fetchProjects(profileId: string): Promise<Project[]> {
  const response = await apiRequest("GET", `/api/projects/${profileId}`);
  return response.json();
}

export async function fetchSkills(profileId: string): Promise<SkillCategory[]> {
  const response = await apiRequest("GET", `/api/skills/${profileId}`);
  return response.json();
}

export async function fetchProfile(userId: string): Promise<Profile> {
  const response = await apiRequest("GET", `/api/profile/${userId}`);
  return response.json();
}
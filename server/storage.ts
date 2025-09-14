import { 
  type User, type InsertUser,
  type Profile, type InsertProfile,
  type Project, type InsertProject,
  type SkillCategory, type InsertSkillCategory,
  type Skill, type InsertSkill,
  type Education, type InsertEducation,
  type Coursework, type InsertCoursework,
  type Interest, type InsertInterest,
  type SocialLink, type InsertSocialLink,
  users, profile, projects, skillCategories, skills, 
  education, coursework, interests, socialLinks
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc } from "drizzle-orm";

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio operations
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Project operations
  getProjects(profileId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Skill operations
  getSkillCategories(profileId: string): Promise<SkillCategory[]>;
  getSkillsByCategory(categoryId: string): Promise<Skill[]>;
  getSkillsWithCategories(profileId: string): Promise<(SkillCategory & { skills: Skill[] })[]>;
  createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Education operations
  getEducation(profileId: string): Promise<Education[]>;
  createEducation(edu: InsertEducation): Promise<Education>;
  
  // Other portfolio data
  getCoursework(profileId: string): Promise<Coursework[]>;
  getInterests(profileId: string): Promise<Interest[]>;
  getSocialLinks(profileId: string): Promise<SocialLink[]>;
  
  // Batch operations
  getCompletePortfolio(userId: string): Promise<{
    profile: Profile | undefined;
    projects: Project[];
    skillCategories: (SkillCategory & { skills: Skill[] })[];
    education: Education[];
    coursework: Coursework[];
    interests: Interest[];
    socialLinks: SocialLink[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Profile operations
  async getProfile(userId: string): Promise<Profile | undefined> {
    const result = await db.select().from(profile).where(eq(profile.userId, userId)).limit(1);
    return result[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const result = await db.insert(profile).values(insertProfile).returning();
    return result[0];
  }

  async updateProfile(userId: string, updateData: Partial<InsertProfile>): Promise<Profile | undefined> {
    const result = await db.update(profile)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(profile.userId, userId))
      .returning();
    return result[0];
  }

  // Project operations
  async getProjects(profileId: string): Promise<Project[]> {
    return await db.select().from(projects)
      .where(eq(projects.profileId, profileId))
      .orderBy(desc(projects.featured), projects.sortOrder);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await db.update(projects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  // Skill operations
  async getSkillCategories(profileId: string): Promise<SkillCategory[]> {
    return await db.select().from(skillCategories)
      .where(eq(skillCategories.profileId, profileId))
      .orderBy(skillCategories.sortOrder);
  }

  async getSkillsByCategory(categoryId: string): Promise<Skill[]> {
    return await db.select().from(skills)
      .where(eq(skills.categoryId, categoryId))
      .orderBy(skills.sortOrder);
  }

  async getSkillsWithCategories(profileId: string): Promise<(SkillCategory & { skills: Skill[] })[]> {
    const categories = await this.getSkillCategories(profileId);
    const result = [];
    
    for (const category of categories) {
      const categorySkills = await this.getSkillsByCategory(category.id);
      result.push({ ...category, skills: categorySkills });
    }
    
    return result;
  }

  async createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory> {
    const result = await db.insert(skillCategories).values(category).returning();
    return result[0];
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }

  // Education operations
  async getEducation(profileId: string): Promise<Education[]> {
    return await db.select().from(education)
      .where(eq(education.profileId, profileId))
      .orderBy(education.sortOrder);
  }

  async createEducation(edu: InsertEducation): Promise<Education> {
    const result = await db.insert(education).values(edu).returning();
    return result[0];
  }

  // Other portfolio data
  async getCoursework(profileId: string): Promise<Coursework[]> {
    return await db.select().from(coursework)
      .where(eq(coursework.profileId, profileId))
      .orderBy(coursework.sortOrder);
  }

  async getInterests(profileId: string): Promise<Interest[]> {
    return await db.select().from(interests)
      .where(eq(interests.profileId, profileId))
      .orderBy(interests.sortOrder);
  }

  async getSocialLinks(profileId: string): Promise<SocialLink[]> {
    return await db.select().from(socialLinks)
      .where(eq(socialLinks.profileId, profileId))
      .orderBy(socialLinks.sortOrder);
  }

  // Batch operations
  async getCompletePortfolio(userId: string): Promise<{
    profile: Profile | undefined;
    projects: Project[];
    skillCategories: (SkillCategory & { skills: Skill[] })[];
    education: Education[];
    coursework: Coursework[];
    interests: Interest[];
    socialLinks: SocialLink[];
  }> {
    const userProfile = await this.getProfile(userId);
    
    if (!userProfile) {
      return {
        profile: undefined,
        projects: [],
        skillCategories: [],
        education: [],
        coursework: [],
        interests: [],
        socialLinks: []
      };
    }

    const [
      userProjects,
      skillCategoriesWithSkills,
      userEducation,
      userCoursework,
      userInterests,
      userSocialLinks
    ] = await Promise.all([
      this.getProjects(userProfile.id),
      this.getSkillsWithCategories(userProfile.id),
      this.getEducation(userProfile.id),
      this.getCoursework(userProfile.id),
      this.getInterests(userProfile.id),
      this.getSocialLinks(userProfile.id)
    ]);

    return {
      profile: userProfile,
      projects: userProjects,
      skillCategories: skillCategoriesWithSkills,
      education: userEducation,
      coursework: userCoursework,
      interests: userInterests,
      socialLinks: userSocialLinks
    };
  }
}

export const storage = new DatabaseStorage();

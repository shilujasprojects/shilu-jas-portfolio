import fs from "fs";
import path from "path";
import { PortfolioData, Project, ContactMessage } from "./types";
import { connectToDatabase } from "./db";
import PortfolioModel from "./models/Portfolio";
import MessageModel from "./models/Message";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio-data.json");

/**
 * Helper to read local JSON file as backup/fallback.
 */
function getLocalPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContents = fs.readFileSync(DATA_FILE_PATH, "utf8");
      return JSON.parse(fileContents);
    }
  } catch (error) {
    console.error("Error reading local portfolio data JSON:", error);
  }
  
  // Fallback to static import if file reading fails
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fallback = require("@/data/portfolio-data.json");
  return fallback as PortfolioData;
}

/**
 * Helper to save to local JSON file as backup.
 */
function saveLocalPortfolioData(data: PortfolioData): boolean {
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing local portfolio data JSON:", error);
    return false;
  }
}

/**
 * Fetches portfolio data from MongoDB if connected.
 * Auto-seeds MongoDB from portfolio-data.json if MongoDB collection is empty.
 * Falls back to local JSON if MongoDB connection fails.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await connectToDatabase();
    if (db) {
      // Look for main portfolio document in MongoDB
      let doc = await PortfolioModel.findOne({ dataKey: "main_portfolio" }).lean();
      
      if (doc) {
        // Return MongoDB document clean object
        return {
          profile: doc.profile,
          stats: doc.stats || [],
          currentlyBuilding: doc.currentlyBuilding || [],
          projects: doc.projects || [],
          skills: doc.skills || {},
          howIBuild: doc.howIBuild || [],
          experience: doc.experience || [],
          education: doc.education || [],
          certifications: doc.certifications || [],
          philosophy: doc.philosophy || [],
          githubActivity: doc.githubActivity || {},
          messages: doc.messages || [],
        } as PortfolioData;
      } else {
        // Auto-seed MongoDB with local JSON data on first database run
        console.log("🌱 Seeding MongoDB Database with initial portfolio data...");
        const initialData = getLocalPortfolioData();
        await PortfolioModel.create({
          dataKey: "main_portfolio",
          ...initialData,
        });
        return initialData;
      }
    }
  } catch (error) {
    console.error("MongoDB fetch failed, falling back to local storage:", error);
  }

  // Fallback to local JSON storage if DB connection or query fails
  return getLocalPortfolioData();
}

/**
 * Saves updated portfolio data to both MongoDB and local JSON file.
 */
export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  let dbSaved = false;

  try {
    const db = await connectToDatabase();
    if (db) {
      await PortfolioModel.findOneAndUpdate(
        { dataKey: "main_portfolio" },
        { ...data },
        { upsert: true, new: true }
      );
      dbSaved = true;
      console.log("💾 Saved portfolio data to MongoDB Database.");
    }
  } catch (error) {
    console.error("MongoDB save error:", error);
  }

  // Always keep local JSON backup updated
  const localSaved = saveLocalPortfolioData(data);
  return dbSaved || localSaved;
}

/**
 * Saves a new contact form message to MongoDB messages collection and portfolio messages.
 */
export async function saveContactMessage(msg: ContactMessage): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    if (db) {
      await MessageModel.create(msg);
      console.log(`📩 Saved message ${msg.id} to MongoDB messages collection.`);
    }
  } catch (error) {
    console.error("MongoDB message save error:", error);
  }

  // Also update overall portfolio messages array
  const currentData = await getPortfolioData();
  const updatedMessages = [msg, ...(currentData.messages || [])];
  currentData.messages = updatedMessages;
  return savePortfolioData(currentData);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await getPortfolioData();
  const project = data.projects.find((p) => p.slug === slug);
  return project || null;
}

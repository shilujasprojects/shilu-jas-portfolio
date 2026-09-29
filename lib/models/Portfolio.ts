import mongoose, { Schema, Document, Model } from "mongoose";
import { PortfolioData } from "../types";

export interface IPortfolioDocument extends PortfolioData, Document {
  dataKey: string; // Identifier key, e.g., "main_portfolio"
  updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema(
  {
    dataKey: { type: String, required: true, unique: true, default: "main_portfolio" },
    profile: { type: Schema.Types.Mixed, required: true },
    stats: { type: Schema.Types.Mixed, default: [] },
    currentlyBuilding: { type: Schema.Types.Mixed, default: [] },
    projects: { type: Schema.Types.Mixed, default: [] },
    skills: { type: Schema.Types.Mixed, default: {} },
    howIBuild: { type: Schema.Types.Mixed, default: [] },
    experience: { type: Schema.Types.Mixed, default: [] },
    education: { type: Schema.Types.Mixed, default: [] },
    certifications: { type: Schema.Types.Mixed, default: [] },
    philosophy: { type: Schema.Types.Mixed, default: [] },
    githubActivity: { type: Schema.Types.Mixed, default: {} },
    messages: { type: Schema.Types.Mixed, default: [] },
  },
  {
    timestamps: true,
    collection: "portfolios", // Explicit MongoDB collection name
  }
);

const PortfolioModel: Model<IPortfolioDocument> =
  mongoose.models.Portfolio || mongoose.model<IPortfolioDocument>("Portfolio", PortfolioSchema);

export default PortfolioModel;

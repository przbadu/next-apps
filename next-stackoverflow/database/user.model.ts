import { Document, Schema, models, model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: Schema.Types.String, required: true },
  username: { type: Schema.Types.String, required: true, unique: true },
  email: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String },
  bio: { type: Schema.Types.String },
  picture: { type: Schema.Types.String, required: true },
  location: { type: Schema.Types.String },
  portfolioWebsite: { type: Schema.Types.String },
  reputation: { type: Schema.Types.Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Schema.Types.Date, default: Date.now() },
});

const User = models.User || model("User", UserSchema);

export default User;

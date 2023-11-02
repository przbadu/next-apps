import { Document, Schema, model, models } from "mongoose";

export interface IAnswer extends Document {
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  content: { type: Schema.Types.String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;

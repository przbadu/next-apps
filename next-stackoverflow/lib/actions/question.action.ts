"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  console.log(params);

  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();
  } catch (error) {
    console.log("Failed to createQuestion", error);
  }
}

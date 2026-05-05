import { db } from "../db";
import { users } from "../db/schema";

export const registerUser = async (data: any) => {
  try {
    const { name, email, password } = data;
    
    // Hash password using Bun's built-in hashing (bcrypt default)
    const hashedPassword = await Bun.password.hash(password);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false };
  }
};

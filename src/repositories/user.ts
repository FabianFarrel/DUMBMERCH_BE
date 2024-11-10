import { PrismaClient } from "@prisma/client";
import { RegisterDto } from "../dtos/auth-dto";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  try {
    console.log("Searching for user with email:", email);
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw new Error("Error finding user by email");
  }
};

export const createUser = async (data: RegisterDto) => {
  try {
    console.log(data);
    return await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        profile: {
          create: {
            fullname: data.username,
          },
        },
      },
      include: { profile: true },
    });
  } catch (error) {
    console.log("Detailed error:", error);

    throw new Error("Error creating user with profile");
  }
};

export const findUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    throw new Error("Error finding user by ID");
  }
};

export const findUserByFullname = async (username: string) => {
  try {
    return await prisma.user.findFirst({
      where: { username },
    });
  } catch (error) {
    throw new Error("Error finding user by full name");
  }
};
export function getUserService() {
  throw new Error("Function not implemented.");
}

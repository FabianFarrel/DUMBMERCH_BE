import { updateProfileDto } from "../dtos/profile-dto";
import { prisma } from "../libs/prisma";

export function findProfile(userId: number) {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      fullname: true,
      address: true,
      gender: true,
      phone: true,
      image: true,
      user: {
        select: {
          email: true,
          role: true,
          id: true,
        },
      },
    },
  });
}

export function editProfile(data: updateProfileDto, userId: number) {
  return prisma.profile.update({
    where: {
      userId,
    },
    data: {
      fullname: data.fullname,
      address: data.address,
      gender: data.gender,
      phone: data.phone,
      image: data.image,
    },
  });
}

export function editProfileImage(profileId: number, url: string) {
  return prisma.profile.update({
    where: { id: profileId },
    data: { image: url },
  });
}

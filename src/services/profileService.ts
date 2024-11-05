import { Gender, updateProfileDto } from "../dtos/profile-dto";
import * as profileRepo from "../repositories/profile";

export async function updateProfile(data: updateProfileDto, userId: number) {
    console.log("User ID:", userId);
    const profile = await profileRepo.findProfile(userId);
    console.log("Retrieved Profile:", profile);
    
    if (!profile) {
        console.log("Profile not found for user ID:", userId);
        throw new Error("Profile not found");
    }

    const updatedData = {
        id: data.id,
        fullname: data.fullname === "" ? profile.fullname : data.fullname,
        address: data.address === "" ? profile.address : data.address,
        gender: (data.gender !== undefined ? data.gender : profile.gender) as Gender | null,
        phone: data.phone !== undefined ? data.phone : profile.phone,  
        image: data.image !== undefined ? data.image : profile.image
    };

    const updatedProfile = await profileRepo.editProfile(updatedData, userId);
    if (!updatedProfile) {
        throw new Error("Profile not updated");
    }

    return updatedProfile;
}

export async function getProfile(userId: number) {
    const profile = await profileRepo.findProfile(userId);
    if (!profile) {
        throw new Error("Profile not found");
    }
    return profile; 
}

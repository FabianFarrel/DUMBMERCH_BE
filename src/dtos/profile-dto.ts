export interface updateProfileDto {
    id: number;
    fullname: string;
    address: string | null;
    gender: Gender | null;
    phone: string | null;
    image: string | null;
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

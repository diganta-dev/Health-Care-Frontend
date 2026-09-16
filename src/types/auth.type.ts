export interface RegisterPayLoad {
    name: string;
    email: string;
    password: string;
    patient?: {
        contactNumber?: string;
    };
}
export interface LoginPayLoad {
    email: string;
    password: string;
}
export interface VerifyOTPPayLoad {
    email: string;
    otp: string;
}
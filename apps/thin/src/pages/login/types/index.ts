export interface SignInFromType {
  username: string;
  password: string;
}

export interface SignUpFromType {
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface ForgotPasswordFromType {
  phoneNumber: string | null;
}

export type AuthFormType = "signIn" | "signUp" | "forgotPassword";

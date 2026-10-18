export type AccountStatus = "ACTIVE" | "DEACTIVATED";
export type Theme = "SYSTEM" | "LIGHT" | "DARK";

export interface UserSettings {
  id: string;
  userId: string;
  theme: Theme;
  notifications: boolean;
}

export interface AuthSession {
  user: User;
  token: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface User {
  email: string;
  id: string;
  first_name: string | null;
  last_name: string | null;
  has_validated_email: boolean;
  failedLoginAttempts: number;
  isLocked: boolean;
  lastLogin: Date;
  account_status: AccountStatus;
  has_onboarded: boolean;
  deviceToken: string | null;
  deviceType: string | null;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings | null;
}

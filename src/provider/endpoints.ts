export const API_ENDPOINTS = {
  auth: {
    signin: "/auth/signin",
    register: "/auth/signup",
    verifyEmail: "/auth/verify-email",
    resendVerificationOtp: "/auth/resend-verification-otp",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    getProfile: "/auth/profile",
    refreshToken: "/auth/token",
    updateProfile: "/auth/profile",
    updateSettings: "/auth/profile/settings",
    deleteAccount: "/auth/account",
  },

  mailAccounts: {
    list: "/mail-accounts",
    connect: "/mail-accounts/connect",
    delete: (id: string) => `/mail-accounts/${id}`,
  },

  messages: {
    handledSince: (since: string) => `/messages?view=handled&since=${encodeURIComponent(since)}`,
    review: "/messages?view=review",
    detail: (id: string) => `/messages/${id}`,
    undo: (id: string) => `/messages/${id}/undo`,
    dismiss: (id: string) => `/messages/${id}/dismiss`,
  },

  rules: {
    create: "/rules",
  },

  reports: {
    list: "/reports",
    detail: (id: string) => `/reports/${id}`,
  },

  notifications: {
    list: "/notifications",
    unreadCount: "/notifications/unread-count",
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: "/notifications/read-all",
    delete: (id: string) => `/notifications/${id}`,
    clearAll: "/notifications",
    registerDevice: "/notifications/device",
  },
};

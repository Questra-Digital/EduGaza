// lib/api.ts
export interface LoginRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export const sendOTP = async (email: string): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email } as LoginRequest),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json?.error || res.statusText };
    return { success: true, data: json };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error' };
  }
};

export const verifyOTP = async (email: string, otp: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string; email: string }>> => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp } as VerifyOTPRequest),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json?.error || res.statusText };
    return { success: true, data: json };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error' };
  }
};

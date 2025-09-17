/**
 * 환경별 환경 변수 관리 유틸리티
 */

export const getAppUrl = (): string => {
  // next.config.ts에서 설정한 환경 변수를 사용
  if (isProduction()) {
    return (
      process.env.NEXT_PUBLIC_APP_URL_PROD ||
      'https://your-production-domain.com'
    );
  } else {
    return process.env.NEXT_PUBLIC_APP_URL_DEV || 'http://localhost:3000';
  }
};

export const getSupabaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
};

export const getSupabaseAnonKey = (): string => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

// Ye file hum nahi use karre everything managed by auth.js


import { auth } from '@/auth';

export const getSessionUser = async () => {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return null;
    }
    
    return {
      user: session.user,
      userId: session.user.id
    };
  } catch (err) {
    console.error('Session error:', err);
    return null;
  }
};
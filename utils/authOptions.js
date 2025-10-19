// utils/authOptions.js
import { auth } from '@/app/api/auth/[...nextauth]/route';

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
    console.log(err);
    return null;
  }
};
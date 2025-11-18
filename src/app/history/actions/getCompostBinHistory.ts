import { useAuth } from "@/app/context/AuthContext";
import cookies from 'js-cookie';

export default async function getBinHistory(binId: string) {
  const authHeader = cookies.get('Authorization')
  const token = authHeader?.split(' ')[1] // remove 'Bearer '

    if (!token) {
      throw new Error('No token found');
    }

  
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/compost-bin/${binId}/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
  
    const result = await response.json();
    console.log(result);
    return result;
  }
  
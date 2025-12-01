import axios from 'axios';

export type ProfileImage = string | { url: string; [key: string]: any };
export interface PillarMember {
  _id: string;
  name: string;
  category: string;
  profileImages?: ProfileImage[];
  designation?: string;
  about?: string;
  experience?: string;
  projects?: any[];
  expertise?: any[];
  skills?: any[];
  isActive?: boolean;
  isFeatured?: boolean;
  image?: string;
  position?: string;
}

export async function fetchPillarsByCategory(category: string): Promise<PillarMember[]> {
  try {
    const res = await axios.get(`/api/pillar?category=${category}&isFeatured=true`);
    return res.data;
  } catch (error) {
    console.error('Error fetching pillars:', error);
    return [];
  }
}

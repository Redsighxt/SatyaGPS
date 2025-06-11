import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@shared/schema';

const fetchMe = async () => {
  try {
    const { data } = await axios.get<User>('/api/me');
    return data;
  } catch (error) {
    return null;
  }
};

export function useAuth() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { user, isLoading, isError };
} 
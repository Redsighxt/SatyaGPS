import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@shared/schema';
import { Crown } from 'lucide-react';

type UserWithScore = User & { score: number };

const fetchUsers = async () => {
  const { data } = await axios.get<UserWithScore[]>('/api/users');
  return data;
};

export default function Leaderboard() {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  // The backend now returns sorted users with scores, so we just take the top 5
  const topUsers = users?.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
        <Crown className="inline-block text-yellow-500 mr-2" />
        Top Players
      </h3>
      <ol className="space-y-4">
        {topUsers?.map((user, index) => (
          <li key={user.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-500 mr-4">{index + 1}</span>
              <span className="font-semibold text-darkgray">{user.displayName}</span>
            </div>
            <span className="font-bold text-coral">{user.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
} 
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        toast({ title: 'Login successful!' });
        setLocation('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: 'Login failed',
          description: error.response.data.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'An unexpected error occurred',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-skyblue via-turquoise to-mint flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-fredoka text-darkgray">Welcome Back!</h1>
          <p className="text-mediumgray">Please sign in to continue your adventure.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full bg-coral hover:bg-red-500" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="text-center text-mediumgray">
          Don't have an account?{' '}
          <Link href="/signup" className="text-coral hover:underline font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 
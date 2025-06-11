import { Rocket, Star, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await axios.post("/api/logout");
    queryClient.invalidateQueries({ queryKey: ["me"] });
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center animate-bounce-slow">
              <Rocket className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-fredoka text-darkgray">
              Satya Simulation GPS Bursum
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div>Loading...</div>
            ) : user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 bg-lightyellow px-4 py-2 rounded-full">
                  <Star className="text-coral h-5 w-5" />
                  <span className="font-semibold text-darkgray">{user.displayName}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-10 h-10 bg-plum rounded-full p-0 hover:scale-110 transition-transform"
                >
                  <LogOut className="text-white h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setLocation("/login")}
                className="w-10 h-10 bg-plum rounded-full p-0 hover:scale-110 transition-transform"
              >
                <User className="text-white h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

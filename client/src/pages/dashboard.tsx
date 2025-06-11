import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudent, useProgress, useAchievements } from "@/hooks/use-progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Rocket, Star, Medal, CheckCircle, Lock, Lightbulb } from "lucide-react";
import { modules as moduleData } from "@/lib/modules";
import { Link } from "wouter";
import * as icons from "lucide-react";
import { getDailyChallenge } from "@/lib/challenge";
import { Button } from "@/components/ui/button";

const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = icons[name as keyof typeof icons] as React.ElementType;
  if (!IconComponent) return <icons.HelpCircle />;
  return <IconComponent className="w-8 h-8 text-white" />;
};

export default function Dashboard() {
  const { data: student } = useStudent(1);
  const { data: progressData } = useProgress(1);
  const { data: achievements } = useAchievements(1);
  const dailyChallenge = getDailyChallenge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-skyblue via-turquoise to-mint p-8">
      <div className="container mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/8.x/bottts/svg?seed=${student?.username}`} />
              <AvatarFallback>{student?.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {student?.displayName}!</h1>
              <p className="text-white/80">Ready to learn something new today?</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg p-2">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              {progressData?.totalPoints ?? 0} Points
            </Badge>
            <Badge variant="secondary" className="text-lg p-2">
              <Rocket className="w-5 h-5 mr-2 text-coral" />
              {progressData?.completedModules ?? 0} Modules Completed
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Modules</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {moduleData.map((module) => {
                  const userProgress = progressData?.progress.find(
                    (p) => p.moduleId === module.id
                  );
                  const isCompleted = userProgress?.completed ?? false;

                  return (
                    <Link key={module.id} href={module.path}>
                      <div className="rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-400">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color}`}>
                            <DynamicIcon name={module.icon} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{module.title}</h3>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                          <div className="ml-auto">
                            {isCompleted && (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {achievements?.length ? (
                  achievements.map((ach) => (
                    <div key={ach.id} className="flex flex-col items-center text-center">
                      <div className="p-3 bg-lightyellow rounded-full">
                        <Medal className="w-8 h-8 text-yellow-500" />
                      </div>
                      <span className="text-sm font-semibold mt-2">{ach.badgeName}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No badges earned yet. Keep learning!</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Daily Challenge</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="font-semibold text-lg">{dailyChallenge.problem.question} = ?</p>
                <p className="text-sm text-gray-500 mb-4">
                  From the '{dailyChallenge.module.title}' module.
                </p>
                <Link href={dailyChallenge.module.path}>
                  <Button>Go to Module</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
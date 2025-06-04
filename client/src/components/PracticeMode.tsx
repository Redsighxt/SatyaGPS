import { MessageCircleQuestion, Gamepad2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PracticeMode() {
  const practiceOptions = [
    {
      title: "Quick Quiz",
      description: "Test your knowledge with random questions",
      icon: MessageCircleQuestion,
      color: "coral",
      action: "Start Quiz"
    },
    {
      title: "Math Games", 
      description: "Play fun matching and puzzle games",
      icon: Gamepad2,
      color: "turquoise",
      action: "Play Games"
    },
    {
      title: "Daily Challenge",
      description: "Complete today's special challenge", 
      icon: Trophy,
      color: "plum",
      action: "Take Challenge"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-fredoka text-darkgray mb-4">
            Practice Makes Perfect!
          </h3>
          <p className="text-xl text-mediumgray max-w-2xl mx-auto">
            Challenge yourself with fun quizzes and games to master each concept
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceOptions.map((option) => {
            const IconComponent = option.icon;
            
            return (
              <div 
                key={option.title}
                className={`bg-gradient-to-br from-${option.color} to-${option.color} rounded-3xl p-6 text-white shadow-xl`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-fredoka mb-3">{option.title}</h4>
                  <p className="mb-6 opacity-90">{option.description}</p>
                  <Button className={`w-full bg-white text-${option.color} font-bold py-3 rounded-2xl hover:bg-gray-100 transition-colors`}>
                    {option.action}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

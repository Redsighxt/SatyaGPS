import { Plus, Layers, Network, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LearningModules() {
  const modules = [
    {
      id: "number-magic",
      title: "Number Magic",
      description: "Learn addition, subtraction, multiplication and division with fun animations!",
      icon: Plus,
      color: "coral",
      progress: 50
    },
    {
      id: "number-building", 
      title: "Number Building",
      description: "Build big numbers with ones, tens, and hundreds blocks!",
      icon: Layers,
      color: "turquoise",
      progress: 75
    },
    {
      id: "number-families",
      title: "Number Families", 
      description: "Discover how numbers are related and find their common friends!",
      icon: Network,
      color: "skyblue",
      progress: 25
    },
    {
      id: "square-world",
      title: "Square World",
      description: "Create perfect squares and discover their magical roots!",
      icon: Grid3X3,
      color: "plum",
      progress: 0
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-fredoka text-center text-darkgray mb-12">
          Choose Your Math Adventure
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;
            const progressDots = 4;
            const completedDots = Math.floor((module.progress / 100) * progressDots);
            
            return (
              <div 
                key={module.id}
                className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br from-${module.color} to-${module.color} rounded-2xl flex items-center justify-center mx-auto mb-4 ${module.id === 'number-magic' ? 'animate-wiggle' : ''}`}>
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-fredoka text-darkgray mb-3">
                    {module.title}
                  </h4>
                  <p className="text-mediumgray mb-4 text-sm">
                    {module.description}
                  </p>
                  <div className={`bg-${module.color} bg-opacity-20 rounded-full py-2 px-4 mb-4`}>
                    <div className="flex items-center justify-center">
                      {Array.from({ length: progressDots }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full mr-1 last:mr-0 ${
                            i < completedDots ? `bg-${module.color}` : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <Link href={`/module/${module.id}`}>
                    <Button className={`w-full bg-${module.color} text-white font-bold py-3 rounded-2xl hover:opacity-90 transition-colors`}>
                      Start Adventure
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

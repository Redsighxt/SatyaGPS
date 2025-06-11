import { Plus, Layers, Network, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const moduleStyles = {
  "number-magic": {
    bg: "bg-gradient-to-br from-coral to-red-400",
    button: "bg-coral",
    progress: "bg-coral",
  },
  "number-building": {
    bg: "bg-gradient-to-br from-turquoise to-teal-400",
    button: "bg-turquoise",
    progress: "bg-turquoise",
  },
  "number-families": {
    bg: "bg-gradient-to-br from-skyblue to-blue-400",
    button: "bg-skyblue",
    progress: "bg-skyblue",
  },
  "square-world": {
    bg: "bg-gradient-to-br from-plum to-purple-400",
    button: "bg-plum",
    progress: "bg-plum",
  },
};

export default function LearningModules() {
  const modules = [
    {
      id: "number-magic",
      title: "Number Magic",
      description: "Learn addition, subtraction, multiplication and division with fun animations!",
      icon: Plus,
      progress: 50
    },
    {
      id: "number-building", 
      title: "Number Building",
      description: "Build big numbers with ones, tens, and hundreds blocks!",
      icon: Layers,
      progress: 75
    },
    {
      id: "number-families",
      title: "Number Families", 
      description: "Discover how numbers are related and find their common friends!",
      icon: Network,
      progress: 25
    },
    {
      id: "square-world",
      title: "Square World",
      description: "Create perfect squares and discover their magical roots!",
      icon: Grid3X3,
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
            const styles = moduleStyles[module.id as keyof typeof moduleStyles];
            
            return (
              <div 
                key={module.id}
                className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${styles.bg} ${module.id === 'number-magic' ? 'animate-wiggle' : ''}`}>
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-fredoka text-darkgray mb-3">
                    {module.title}
                  </h4>
                  <p className="text-mediumgray mb-4 text-sm">
                    {module.description}
                  </p>
                  <Link href={`/module/${module.id}`}>
                    <Button className={`w-full text-white font-bold py-3 rounded-2xl hover:opacity-90 transition-colors ${styles.button}`}>
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

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
  const students = [
    { name: "Emma Johnson", progress: 75, grade: "A+" },
    { name: "Alex Chen", progress: 60, grade: "B+" }
  ];

  const focusAreas = [
    { name: "Addition", checked: true },
    { name: "Multiplication", checked: false },
    { name: "Place Value", checked: true },
    { name: "Squares", checked: false }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-fredoka text-darkgray mb-4">
              For Teachers & Parents
            </h3>
            <p className="text-xl text-mediumgray">
              Track progress and customize learning experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Tracking */}
            <div className="space-y-6">
              <h4 className="text-xl font-fredoka text-darkgray">Student Progress</h4>
              
              {students.map((student, index) => (
                <div key={student.name} className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4">
                  <div className={`w-12 h-12 ${index === 0 ? 'bg-skyblue' : 'bg-coral'} rounded-full flex items-center justify-center`}>
                    <User className="text-white h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-darkgray">{student.name}</h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="bg-gray-200 rounded-full h-2 flex-1">
                        <div 
                          className={`${index === 0 ? 'bg-mint' : 'bg-turquoise'} h-2 rounded-full`} 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-mediumgray">{student.progress}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`${index === 0 ? 'text-coral' : 'text-skyblue'} font-bold`}>{student.grade}</div>
                    <div className="text-xs text-mediumgray">Grade</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Customization Options */}
            <div className="space-y-6">
              <h4 className="text-xl font-fredoka text-darkgray">Customization</h4>
              
              <div className="space-y-4">
                <div className="bg-lightyellow rounded-2xl p-4">
                  <h5 className="font-semibold text-darkgray mb-2">Difficulty Level</h5>
                  <div className="flex space-x-2">
                    <Button className="bg-mint text-white rounded-full text-sm font-semibold">
                      Beginner
                    </Button>
                    <Button variant="secondary" className="rounded-full text-sm">
                      Intermediate
                    </Button>
                    <Button variant="secondary" className="rounded-full text-sm">
                      Advanced
                    </Button>
                  </div>
                </div>
                
                <div className="bg-lightyellow rounded-2xl p-4">
                  <h5 className="font-semibold text-darkgray mb-2">Focus Areas</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {focusAreas.map((area) => (
                      <label key={area.name} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300" 
                          defaultChecked={area.checked}
                        />
                        <span className="text-sm">{area.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

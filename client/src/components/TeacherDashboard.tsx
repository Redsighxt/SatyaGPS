import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User as UserIcon } from "lucide-react";
import { User, UserProgress } from "@shared/schema";

type UserWithProgress = User & { progress: UserProgress[] };

const fetchUsersWithProgress = async () => {
  const { data } = await axios.get<UserWithProgress[]>('/api/users/progress');
  return data;
};

const calculateOverallProgress = (progress: UserProgress[]) => {
  if (progress.length === 0) return { percentage: 0, grade: 'N/A' };
  const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
  // Assuming each module is worth 100 points for progress calculation
  const totalPossibleScore = progress.length * 100;
  if (totalPossibleScore === 0) return { percentage: 0, grade: 'N/A' };
  const percentage = (totalScore / totalPossibleScore) * 100;
  
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';

  return { percentage: Math.round(percentage), grade };
};

export default function TeacherDashboard() {
  const { data: students, isLoading, isError } = useQuery({
    queryKey: ['usersWithProgress'],
    queryFn: fetchUsersWithProgress
  });

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
              
              {isLoading && <div className="text-center">Loading student data...</div>}
              {isError && <div className="text-center text-red-500">Could not fetch student data.</div>}
              {students?.map((student, index) => {
                const { percentage, grade } = calculateOverallProgress(student.progress);
                return (
                  <div key={student.id} className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4">
                    <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-skyblue' : 'bg-coral'} rounded-full flex items-center justify-center`}>
                      <UserIcon className="text-white h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-darkgray">{student.displayName}</h5>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="bg-gray-200 rounded-full h-2 flex-1">
                          <div 
                            className={`${index % 2 === 0 ? 'bg-mint' : 'bg-turquoise'} h-2 rounded-full`} 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-mediumgray">{percentage}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`${index % 2 === 0 ? 'text-coral' : 'text-skyblue'} font-bold`}>{grade}</div>
                      <div className="text-xs text-mediumgray">Grade</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Customization Options */}
            <div className="space-y-6">
              <h4 className="text-xl font-fredoka text-darkgray">Customization</h4>
              <div className="bg-lightyellow rounded-2xl p-4 text-center">
                <p className="text-mediumgray">More customization options coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

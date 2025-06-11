import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { learningModules } from "@/lib/modules";

export default function FocusArea() {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const handleCheckboxChange = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const startSession = () => {
    if (selectedModules.length > 0) {
      setLocation(`/session?modules=${selectedModules.join(',')}`);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-fredoka">Focus Area</CardTitle>
        <CardDescription>Select modules for a focused practice session.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {learningModules.map((module) => (
            <div key={module.id} className="flex items-center space-x-2">
              <Checkbox
                id={module.id}
                checked={selectedModules.includes(module.id)}
                onCheckedChange={() => handleCheckboxChange(module.id)}
              />
              <Label htmlFor={module.id} className="text-lg">
                {module.name}
              </Label>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button onClick={startSession} disabled={selectedModules.length === 0}>
            Start Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NumberLine from "@/components/interactive/number-line";
import { gcd, lcm, getFactors, getCommonFactors, getMultiples, getCommonMultiples } from "@/lib/math-utils";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LcmHcf() {
  const [number1, setNumber1] = useState(12);
  const [number2, setNumber2] = useState(18);
  const [showFactors, setShowFactors] = useState(true);
  const [showMultiples, setShowMultiples] = useState(false);
  const [score, setScore] = useState(0);

  const hcf = gcd(number1, number2);
  const lcmResult = lcm(number1, number2);
  const factors1 = getFactors(number1);
  const factors2 = getFactors(number2);
  const commonFactors = getCommonFactors(number1, number2);
  const multiples1 = getMultiples(number1, 10);
  const multiples2 = getMultiples(number2, 10);
  const commonMultiples = getCommonMultiples(number1, number2, 5);

  const generateRandomNumbers = () => {
    const num1 = Math.floor(Math.random() * 20) + 4;
    const num2 = Math.floor(Math.random() * 20) + 4;
    setNumber1(num1);
    setNumber2(num2);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="bg-lightyellow px-4 py-2 rounded-full">
              <span className="font-semibold text-darkgray">Score: {score}</span>
            </div>
            <Button onClick={generateRandomNumbers} variant="outline">
              <RotateCcw size={16} className="mr-2" />
              New Numbers
            </Button>
          </div>
        </div>

        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-fredoka text-white mb-4">
            Number Families
          </h1>
          <p className="text-xl text-white">
            Discover how numbers are related through factors and multiples!
          </p>
        </motion.div>

        {/* Number Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-fredoka">Choose Your Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="text-xl font-fredoka text-darkgray mb-4">First Number</h4>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={() => setNumber1(Math.max(2, number1 - 1))}
                    size="lg"
                    variant="outline"
                  >
                    -
                  </Button>
                  <motion.div 
                    className="w-24 h-24 bg-coral rounded-2xl flex items-center justify-center text-white font-bold text-3xl"
                    key={number1}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {number1}
                  </motion.div>
                  <Button
                    onClick={() => setNumber1(Math.min(50, number1 + 1))}
                    size="lg"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-fredoka text-darkgray mb-4">Second Number</h4>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={() => setNumber2(Math.max(2, number2 - 1))}
                    size="lg"
                    variant="outline"
                  >
                    -
                  </Button>
                  <motion.div 
                    className="w-24 h-24 bg-turquoise rounded-2xl flex items-center justify-center text-white font-bold text-3xl"
                    key={number2}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {number2}
                  </motion.div>
                  <Button
                    onClick={() => setNumber2(Math.min(50, number2 + 1))}
                    size="lg"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka text-coral">
                Highest Common Factor (HCF)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div 
                  className="text-6xl font-bold text-coral mb-4"
                  key={hcf}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {hcf}
                </motion.div>
                <p className="text-mediumgray">
                  The largest number that divides both {number1} and {number2}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka text-turquoise">
                Least Common Multiple (LCM)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div 
                  className="text-6xl font-bold text-turquoise mb-4"
                  key={lcmResult}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {lcmResult}
                </motion.div>
                <p className="text-mediumgray">
                  The smallest number that both {number1} and {number2} divide into
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Exploration */}
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => { setShowFactors(true); setShowMultiples(false); }}
              variant={showFactors ? "default" : "outline"}
              className="bg-coral hover:bg-red-500"
            >
              Explore Factors
            </Button>
            <Button
              onClick={() => { setShowFactors(false); setShowMultiples(true); }}
              variant={showMultiples ? "default" : "outline"}
              className="bg-turquoise hover:bg-teal-500"
            >
              Explore Multiples
            </Button>
          </div>

          {/* Factors Mode */}
          {showFactors && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-fredoka">Factor Explorer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <NumberLine
                    min={1}
                    max={Math.max(number1, number2)}
                    value={Math.min(number1, number2)}
                    showFactors={true}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-coral bg-opacity-10 rounded-xl p-4">
                      <h5 className="font-fredoka text-coral mb-3">Factors of {number1}</h5>
                      <div className="flex flex-wrap gap-2">
                        {factors1.map((factor) => (
                          <motion.div
                            key={factor}
                            className="w-10 h-10 bg-coral rounded-full flex items-center justify-center text-white font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: factor * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {factor}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-turquoise bg-opacity-10 rounded-xl p-4">
                      <h5 className="font-fredoka text-turquoise mb-3">Factors of {number2}</h5>
                      <div className="flex flex-wrap gap-2">
                        {factors2.map((factor) => (
                          <motion.div
                            key={factor}
                            className="w-10 h-10 bg-turquoise rounded-full flex items-center justify-center text-white font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: factor * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {factor}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-mint bg-opacity-10 rounded-xl p-4">
                      <h5 className="font-fredoka text-mint mb-3">Common Factors</h5>
                      <div className="flex flex-wrap gap-2">
                        {commonFactors.map((factor) => (
                          <motion.div
                            key={factor}
                            className="w-10 h-10 bg-mint rounded-full flex items-center justify-center text-white font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: factor * 0.1 }}
                            whileHover={{ scale: 1.2 }}
                          >
                            {factor}
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-sm text-mediumgray mt-2">
                        HCF = {hcf} (largest common factor)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Multiples Mode */}
          {showMultiples && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-fredoka">Multiple Explorer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-coral bg-opacity-10 rounded-xl p-4">
                      <h5 className="font-fredoka text-coral mb-3">Multiples of {number1}</h5>
                      <div className="grid grid-cols-5 gap-2">
                        {multiples1.map((multiple, index) => (
                          <motion.div
                            key={multiple}
                            className={`h-8 rounded flex items-center justify-center text-xs font-bold ${
                              commonMultiples.includes(multiple)
                                ? 'bg-mint text-white'
                                : 'bg-coral text-white'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {multiple}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-turquoise bg-opacity-10 rounded-xl p-4">
                      <h5 className="font-fredoka text-turquoise mb-3">Multiples of {number2}</h5>
                      <div className="grid grid-cols-5 gap-2">
                        {multiples2.map((multiple, index) => (
                          <motion.div
                            key={multiple}
                            className={`h-8 rounded flex items-center justify-center text-xs font-bold ${
                              commonMultiples.includes(multiple)
                                ? 'bg-mint text-white'
                                : 'bg-turquoise text-white'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {multiple}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-mint bg-opacity-10 rounded-xl p-4">
                      <h5 className="font-fredoka text-mint mb-3">Common Multiples</h5>
                      <div className="space-y-2">
                        {commonMultiples.map((multiple, index) => (
                          <motion.div
                            key={multiple}
                            className="h-8 bg-mint rounded flex items-center justify-center text-white font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {multiple}
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-sm text-mediumgray mt-2">
                        LCM = {lcmResult} (smallest common multiple)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Venn Diagram Visualization */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-fredoka">Venn Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <svg width="400" height="300" viewBox="0 0 400 300" className="bg-gray-50 rounded-lg">
                {/* Left circle */}
                <circle cx="150" cy="150" r="80" fill="hsl(var(--coral))" fillOpacity="0.3" stroke="hsl(var(--coral))" strokeWidth="3" />
                <text x="120" y="90" textAnchor="middle" className="font-bold text-coral" fontSize="14">
                  {number1}
                </text>
                
                {/* Right circle */}
                <circle cx="250" cy="150" r="80" fill="hsl(var(--turquoise))" fillOpacity="0.3" stroke="hsl(var(--turquoise))" strokeWidth="3" />
                <text x="280" y="90" textAnchor="middle" className="font-bold text-turquoise" fontSize="14">
                  {number2}
                </text>
                
                {/* Intersection label */}
                <text x="200" y="120" textAnchor="middle" className="font-bold text-mint" fontSize="12">
                  Common Factors
                </text>
                
                {/* Common factors in intersection */}
                {commonFactors.slice(0, 6).map((factor, index) => (
                  <text 
                    key={factor}
                    x={190 + (index % 2) * 20} 
                    y={140 + Math.floor(index / 2) * 20} 
                    textAnchor="middle" 
                    className="font-bold text-darkgray" 
                    fontSize="12"
                  >
                    {factor}
                  </text>
                ))}
                
                {/* HCF highlight */}
                <text x="200" y="200" textAnchor="middle" className="font-bold text-mint" fontSize="16">
                  HCF = {hcf}
                </text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

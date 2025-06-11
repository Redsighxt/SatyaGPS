import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function GeometryModule() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(5);

  const area = width * height;
  const perimeter = 2 * (width + height);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-400 p-8">
      <Link href="/">
        <Button variant="secondary" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Shape Shifters</h1>
        <p className="text-gray-600 mb-8">Use the sliders to change the rectangle and see its area and perimeter.</p>

        <div className="flex justify-center my-12">
          <motion.div
            className="bg-purple-500 rounded-lg"
            animate={{ width: width * 16, height: height * 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <label className="font-semibold">Width: {width}</label>
            <Slider defaultValue={[width]} max={20} min={2} step={1} onValueChange={(vals) => setWidth(vals[0])} />
          </div>
          <div>
            <label className="font-semibold">Height: {height}</label>
            <Slider defaultValue={[height]} max={15} min={2} step={1} onValueChange={(vals) => setHeight(vals[0])} />
          </div>
        </div>

        <div className="flex justify-around text-2xl font-bold">
          <div className="flex items-center gap-2">
            <Maximize className="text-purple-600"/>
            Area: {area}
          </div>
          <div className="flex items-center gap-2">
            <Minimize className="text-purple-600" />
            Perimeter: {perimeter}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href={`/module/geometry/challenge`}>
            <Button>Start Challenge</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 
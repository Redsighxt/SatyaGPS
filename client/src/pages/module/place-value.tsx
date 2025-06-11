import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { PlaceValueBlocks } from '@/components/learning/PlaceValueBlocks';
import { useUpdateProgress } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import Header from "@/components/Header";
import PlaceValueChart from "@/components/PlaceValueChart";

export default function PlaceValueModule() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-fredoka text-white mb-2">
                Number Building
              </h1>
              <p className="text-white/90 text-lg">Build big numbers with ones, tens, and hundreds blocks!</p>
            </div>
            <div className="w-40" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
              Build Numbers with Place Value
            </h3>
            <PlaceValueChart />
            <div className="text-center mt-8">
              <Link href={`/module/place-value/challenge`}>
                <Button>Start Challenge</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

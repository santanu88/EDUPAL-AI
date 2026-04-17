import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  BrainCircuit,
  LineChart,
  MessageSquareText,
} from "lucide-react";

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay,
}: FeatureCardProps) {
  const [, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gray-900 p-6 shadow-xl transition-all duration-300",
        "hover:shadow-2xl",
        "border border-gray-800"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br",
          color,
          "opacity-5 group-hover:opacity-10"
        )}
      />

      {/* Icon with gradient background */}
      <div
        className={cn(
          "mb-5 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br",
          color,
          "text-white shadow-lg transition-transform duration-300",
          "group-hover:scale-110"
        )}
      >
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#f0f0f0]">
        {title}
      </h3>

      <p className="mb-6 text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
        {description}
      </p>

      <div
        className={cn(
          "absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br",
          color,
          "opacity-20 blur-xl transition-all duration-500",
          "group-hover:opacity-30 group-hover:blur-2xl"
        )}
      />
    </motion.div>
  );
}

export default function FeatureCards() {
  return (
    <section className="w-full bg-[#030303] py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-1 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 p-5"
          >
            <motion.h2
              initial={{
                backgroundPosition: "200% 50%",
                opacity: 0.5,
              }}
              whileInView={{
                backgroundPosition: "0% 50%",
                opacity: 1,
              }}
              transition={{
                duration: 1.9,
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 pt-8 sm:pt-10 md:pt-12 lg:pt-16 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-[length:200%_100%]"
            >
              Powerful AI-Driven Learning Features
            </motion.h2>
            <p className=" pt-1 mt-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 md:text-lg">
              Discover how Edupal AI transforms your educational experience
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <FeatureCard
            icon={<BrainCircuit className="h-8 w-8" />}
            title="AI-Powered Learning Paths"
            description="Personalized learning journeys tailored to your goals, learning style, and pace. Our AI adapts as you progress."
            color="from-purple-600 to-indigo-600"
            delay={0.1}
          />
          <FeatureCard
            icon={<LineChart className="h-8 w-8" />}
            title="Exam Optimized AI Tutors"
            description="AI trained on university patterns, 
Rejects off-topic queries & redirects to relevant syllabus."
            color="from-emerald-600 to-teal-600"
            delay={0.3}
          />
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Simplified Learning Content"
            description="It offers 3-line explanations, 5 key points, and examples — making complex concepts easy to digest quickly"
            color="from-blue-600 to-cyan-600"
            delay={0.2}
          />

          <FeatureCard
            icon={<MessageSquareText className="h-8 w-8" />}
            title="Interactive and Visual Cues"
            description="It uses emojis, highlighted text, and organized bullet points to make the learning experience more engaging and visually appealing."
            color="from-rose-600 to-pink-600"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

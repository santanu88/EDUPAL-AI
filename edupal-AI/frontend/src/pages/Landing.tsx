
import { Hero } from "../components/Hero";
import { ShineBorder } from "../components/Hero-Image";
import chat from "../assets/chat.jpg"
import mac from "../assets/mac.jpg"
//import { TestimonialsSectionDemo } from "../Testimonial";
import {  Zap, ArrowDownToDot } from "lucide-react"
import { PricingSection } from "../components/Pricing"
import Footer from "../components/Footer";
import InfiniteMovingCardsDemo from "../components/InfiniteMovingCardsDemo"
import { motion } from "framer-motion"
import FeatureCards from "../components/FeatureCard";


const defaultTiers = [
    {
      name: "Starter",
      price: {
        monthly: 15,
        yearly: 144,
      },
      description: "Perfect for individuals and small projects",
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-gray-500/30 blur-2xl rounded-full" />
          <Zap className="w-7 h-7 relative z-10 text-gray-500 dark:text-gray-400 animate-[float_3s_ease-in-out_infinite]" />
        </div>
      ),
      features: [
        {
          name: "Basic Analytics",
          description: "Basic topic explanations (3 sentences + 3 key points) basic resources",
          included: true,
        },
        {
          name: "5 Team Members",
          description: "5 Q&A/day (1-mark & 5-mark only)",
          included: true,
        },
        {
          name: "",
          description: "2 common mistakes per topic",
          included: true,
        },
        {
          name: "API Access",
          description: "share custom question sets",
          included: false,
        },
        {
          name: "API Access",
          description: "Generate auto-graded quizzes",
          included: false,
        }, {
          name: "API Access",
          description: " No API access",
          included: false,
        },
         
      
      ],
    },
    {
      name: "Pro",
      price: {
        monthly: 49,
        yearly: 470,
      },
      description: "Ideal for growing teams and businesses",
      highlight: true,
      badge: "Most Popular",
      icon: (
        <div className="relative">
          <ArrowDownToDot className="w-7 h-7 relative z-10" />
        </div>
      ),
      features: [
        {
          name: "Predicted Questions",
          description: "Unlimited 1/5/10-mark predicted questions",
          included: true
        },
        {
          name: "Mistake Analysis",
          description: "Personalized mistake analysis",
          included: true
        },
        {
          name: "Media Upload",
          description: "Upload images documents",
          included: true
        },
        {
          name: "Study Aids",
          description: "Mnemonics + AI-generated mind maps / chat history",
          included: true
        },
        {
          name: "Custom Question Sets",
          description: "Share custom question sets (unlimited)",
          included: true
        },
        {
          name: "Auto-graded Quizzes",
          description: "Generate auto-graded quizzes (unlimited)",
          included: true
        },
        {
          name: "Custom Models",
          description: "Make your custom Fine-tuned models for your curriculum",
          included: true
        },
        {
          name: "API Access",
          description: "Make your custom Fine-tuned models for your curriculum access",
          included: true
        }
      ],
    },
  ]
  

const LandingPage = () => {
  return (
    <div>
    <Hero
      badge="Introducing Edupal AI"
      title1="Master Exams"
      title2="With AI-Powered Experts"
      
    />

<div className="pt-30 py-20 bg-[#030303]">
<ShineBorder
className="relative  mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 my-8 bg-black"
borderClassName=" rounded-xl overflow-hidden shadow-lg"
>
<div className="relative">
  <motion.img
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    src={mac}
    alt="Background Gradient"
    width={1920}
    height={1080}
    className="w-full h-auto object-cover"
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-black/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl w-[90%] md:w-[85%] lg:w-[80%]">
      <div className="w-full">
        <img
          src={chat}
          alt="Code Editor"
          width={800}
          height={600}
          className="w-full h-auto object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</div>
</ShineBorder>
<FeatureCards/>
    
</div>
<InfiniteMovingCardsDemo/>
<PricingSection  />
<Footer/>
  </div>
  )
}

export default LandingPage
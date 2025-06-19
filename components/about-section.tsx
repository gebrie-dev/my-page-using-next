"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Heart } from "lucide-react";
import Image from "next/image";

const timeline = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "Tech Innovation Corp",
    description:
      "Leading development of scalable web applications using Next.js and cloud technologies.",
    icon: Award,
  },
  {
    year: "2023",
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    description:
      "Built responsive web applications and RESTful APIs serving 100k+ users.",
    icon: Calendar,
  },
  {
    year: "2022",
    title: "Next js Developer",
    company: "Creative Agency",
    description:
      "Specialized in React development and modern UI/UX implementation.",
    icon: Heart,
  },
  {
    year: "2021",
    title: "software Engineering Graduate",
    company: "Adama Science And Technology University ",
    description:
      "Graduated with honors, specializing in web technologies and software engineering.",
    icon: MapPin,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate developer from Addis Ababa, combining technical expertise
            with creative vision to build exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto glassmorphism rounded-full p-4 animate-pulse-glow">
                <Image
                  src="/me.png?height=300&width=300"
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 glassmorphism p-4 rounded-full">
                <Heart className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Gebrie wagnew</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                Adama, Ethiopia
              </p>
              <p className="text-lg leading-relaxed">
                With over 3 years of experience in web development, I specialize
                in creating modern, scalable applications that deliver
                exceptional user experiences. My passion lies in the
                intersection of technology and design.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8">My Journey</h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-blue-500" />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 pb-8"
                >
                  <div className="glassmorphism p-3 rounded-full z-10">
                    <item.icon className="w-6 h-6 text-gradient" />
                  </div>

                  <div className="glassmorphism p-6 rounded-xl flex-1 hover:scale-105 transition-transform duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-gradient">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.company}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

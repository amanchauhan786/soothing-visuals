
import React from 'react';
import { useInView } from '@/utils/animations';
import { Code, Database, Cloud, BarChart, Server, Terminal, Book, Settings } from 'lucide-react';

// Define skill categories with their respective skills
const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Code className="w-5 h-5" />,
    skills: ['Python', 'C++', 'C', 'Java', 'JavaScript', 'SQL', 'RISC-V Assembly', 'Verilog/SystemVerilog', 'Bash', 'HTML/CSS']
  },
  {
    title: 'Frameworks & Libraries',
    icon: <Terminal className="w-5 h-5" />,
    skills: ['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'LangChain', 'SpaCy', 'NLTK']
  },
  {
    title: 'Tools & Platforms',
    icon: <Settings className="w-5 h-5" />,
    skills: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'MySQL', 'MongoDB', 'Xilinx Vivado', 'RVfpga', 'Cisco Packet Tracer']
  },
  {
    title: 'Cloud & Platforms',
    icon: <Cloud className="w-5 h-5" />,
    skills: ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'FPGA', 'ESP32', 'Arduino', 'Linux', 'Windows']
  },
  {
    title: 'Soft Skills',
    icon: <Book className="w-5 h-5" />,
    skills: ['Technical Leadership', 'Full-Cycle Project Management', 'Strategic Problem-Solving']
  }
];

export const Skills: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  
  return (
    <section id="skills" className="section bg-secondary/30">
      <div ref={ref} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technical expertise and capabilities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className={`glass-card p-6 transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-3 py-1.5 bg-background/50 border border-border rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

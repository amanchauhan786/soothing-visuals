
import React from 'react';
import { useInView } from '@/utils/animations';
import { Code, Database, Cloud, BarChart, Server, Terminal, Book, Settings } from 'lucide-react';

// Define skill categories with their respective skills
const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Code className="w-5 h-5" />,
    skills: ['Python', 'C', 'C++', 'Java']
  },
  {
    title: 'Web Technologies',
    icon: <Terminal className="w-5 h-5" />,
    skills: ['React.js', 'Node.js', 'Flask', 'Tailwind CSS', 'Vite']
  },
  {
    title: 'Database Systems',
    icon: <Database className="w-5 h-5" />,
    skills: ['MySQL', 'Firebase', 'MongoDB']
  },
  {
    title: 'Data Science & Machine Learning',
    icon: <BarChart className="w-5 h-5" />,
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'OpenCV', 'LangChain']
  },
  {
    title: 'Cloud Technologies',
    icon: <Cloud className="w-5 h-5" />,
    skills: ['AWS', 'Google Cloud Platform (GCP)', 'Firebase']
  },
  {
    title: 'Research Skills',
    icon: <Book className="w-5 h-5" />,
    skills: ['AI/ML Model Development', 'Data Analysis', 'Content Optimization', 'Network Simulation', 'Predictive Analytics', 'Automation Systems']
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

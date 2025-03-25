
import React from 'react';
import { useInView } from '@/utils/animations';
import { Award, Briefcase, FileText, GraduationCap, Check, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Achievements: React.FC = () => {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div 
        ref={ref} 
        className={`container mx-auto px-4 transition-all duration-1000 transform ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Achievements & Experience
        </h2>

        <Tabs defaultValue="honors" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8 w-full">
            <TabsTrigger value="honors" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Honors & Awards</span>
              <span className="sm:hidden">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Volunteer</span>
              <span className="sm:hidden">Work</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Certifications</span>
              <span className="sm:hidden">Certs</span>
            </TabsTrigger>
            <TabsTrigger value="additional" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Additional</span>
              <span className="sm:hidden">More</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="honors" className="space-y-6">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  Reboot Hackathon 1st Prize
                </h3>
                <p className="text-muted-foreground mb-2">IEEE-RAS, VIT Vellore</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Secured 1st place among 30 teams, showcasing innovative problem-solving in robotics and automation.</li>
                  <li>Developed a real-time LiDAR-based tunnel inspection system.</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  Roboverse Hackathon 2nd Prize
                </h3>
                <p className="text-muted-foreground mb-2">IEEE-RAS, VIT Vellore</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Awarded 2nd place for successfully developing a functional prototype in robotics and AI.</li>
                  <li>Developed an AI-based animal intrusion alert and plant health monitoring system.</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  National Startup Competition Top 16 Finalist
                </h3>
                <p className="text-muted-foreground mb-2">Central University of Rajasthan</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Recognized among India's top 16 startups, demonstrating innovation and entrepreneurial skills.</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  Agrithon 1st Prize Winner
                </h3>
                <p className="text-muted-foreground mb-2">VIT Vellore</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Secured 1st place for excellence in agricultural innovation using AI-driven solutions.</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  IDE Bootcamp 2024 Selected-among Top Finalists
                </h3>
                <p className="text-muted-foreground mb-2">NIT Karnataka</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>CropSky selected for a prestigious entrepreneurial bootcamp, focusing on AgriTech innovation.</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="volunteer" className="space-y-6">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Technical Head
                  </h3>
                  <span className="text-sm text-muted-foreground">July 2024 - Present</span>
                </div>
                <p className="text-muted-foreground mb-2">Anti Drug Abuse Club VIT</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Engineered an interactive awareness website to amplify the club's impact.</li>
                  <li>Boosted outreach with engaging digital campaigns and dynamic content.</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Machine Learning Intern
                  </h3>
                  <span className="text-sm text-muted-foreground">June 2024 - August 2024</span>
                </div>
                <p className="text-muted-foreground mb-2">Suvidha Overseas(Foundation)</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Developed and optimized machine learning models using Microsoft Azure ML.</li>
                  <li>Applied supervised learning techniques to improve predictive accuracy.</li>
                  <li>Enhanced search engine optimization (SEO) strategies for data-driven insights.</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Kharagpur Data Science Hackathon 2025</h3>
                  <p className="text-sm text-muted-foreground">Jan 2025</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">ISRO - AI/ML for Geo Data Analysis</h3>
                  <p className="text-sm text-muted-foreground">Sep 2024</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Power BI Masterclass</h3>
                  <p className="text-sm text-muted-foreground">Sep 2024</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Building Gen AI App Projects with Gemini Pro</h3>
                  <p className="text-sm text-muted-foreground">Sep 2024</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Microsoft Certified: Azure AI Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">July 2024</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">ISRO- Geospatial Technology for Climate Smart Agriculture</h3>
                  <p className="text-sm text-muted-foreground">Sep 2023</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="bg-card rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Hindi (Native)</Badge>
                  <Badge variant="secondary">English (Fluent)</Badge>
                  <Badge variant="secondary">Japanese (Basic)</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Playing Guitar</Badge>
                  <Badge variant="secondary">Badminton</Badge>
                  <Badge variant="secondary">Physical Fitness</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Achievements;

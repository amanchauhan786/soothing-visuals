
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
                  Startup Selected for Venture Acceleration Program (SVAP)
                </h3>
                <p className="text-muted-foreground mb-2">University of Toronto</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>CropSky selected for prestigious venture acceleration program showcasing innovation in AgriTech.</li>
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
                  Agrithon 1st Prize Winner (2x)
                </h3>
                <p className="text-muted-foreground mb-2">VIT Vellore</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Awarded 1st Prize twice for Excellence in Agricultural Innovation using AI-driven solutions.</li>
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
                  <span className="text-sm text-muted-foreground">Present</span>
                </div>
                <p className="text-muted-foreground mb-2">Anti-Drug Abuse Club VIT Vellore, India</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Directed technical strategy and website launch to accelerate growth for a 300+ member community.</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Conference Coordinator
                  </h3>
                  <span className="text-sm text-muted-foreground">2024</span>
                </div>
                <p className="text-muted-foreground mb-2">ICETITE 2024, Vellore, India</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Coordinated the conference with 500+ participants, managing all speakers and attendees.</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Machine Learning Operations (MLOps) for Generative AI</h3>
                  <p className="text-sm text-muted-foreground">Google</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">AI/ML for Geo Data Analysis</h3>
                  <p className="text-sm text-muted-foreground">ISRO</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Microsoft Certified: Azure AI Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">Microsoft</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Artificial Intelligence Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">IBM</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Computer Vision Lab Badge</h3>
                  <p className="text-sm text-muted-foreground">WorldQuant University</p>
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

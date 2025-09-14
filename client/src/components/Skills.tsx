import { useEffect, useState } from "react";
import { Code, Globe, Wrench } from "lucide-react";

// Static skills data - no API needed!
const skillCategories = [
  {
    id: "1",
    title: "Frontend Development",
    icon: "Code",
    skills: [
      { id: "1", name: "React", percentage: 90 },
      { id: "2", name: "TypeScript", percentage: 85 },
      { id: "3", name: "HTML/CSS", percentage: 95 },
      { id: "4", name: "Tailwind CSS", percentage: 80 }
    ]
  },
  {
    id: "2", 
    title: "Backend Development",
    icon: "Globe",
    skills: [
      { id: "5", name: "Node.js", percentage: 80 },
      { id: "6", name: "Python", percentage: 75 },
      { id: "7", name: "Express.js", percentage: 70 },
      { id: "8", name: "REST APIs", percentage: 85 }
    ]
  },
  {
    id: "3",
    title: "Tools & Technologies", 
    icon: "Wrench",
    skills: [
      { id: "9", name: "Git", percentage: 90 },
      { id: "10", name: "VS Code", percentage: 95 },
      { id: "11", name: "PostgreSQL", percentage: 70 },
      { id: "12", name: "Docker", percentage: 60 }
    ]
  }
];

// Icon mapping for skill categories
const iconMap: Record<string, React.ComponentType<any>> = {
  'Code': Code,
  'Globe': Globe,
  'Wrench': Wrench,
};

export default function Skills() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-muted-foreground">Technologies I work with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <div key={category.id} className="glass-card p-8 rounded-xl">
                <div className="text-center mb-6">
                  <Icon
                    className={`text-4xl mb-4 mx-auto ${
                      categoryIndex % 2 === 0 ? "text-primary" : "text-accent"
                  }`}
                  size={48}
                />
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            categoryIndex % 2 === 0
                              ? "bg-primary"
                              : "bg-accent"
                          }`}
                          style={{
                            width: animate ? `${skill.percentage}%` : "0%",
                          }}
                          data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

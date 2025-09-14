import { ExternalLink, Github } from "lucide-react";

// Static projects data - no API needed!
const projects = [
  {
    id: "1",
    title: "E-Commerce Website",
    description: "A full-stack e-commerce platform built with React and Node.js. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: "2", 
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates. Users can create projects, assign tasks, set deadlines, and track progress.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that displays current weather conditions, forecasts, and historical data. Features location-based weather and interactive charts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3"],
    demoLink: "#", 
    codeLink: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground">Some things I've built recently</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            
            return (
              <div key={project.id} className="project-card glass-card rounded-xl overflow-hidden">
                <img
                  src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  data-testid={`project-image-${index}`}
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3" data-testid={`project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`project-description-${index}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 rounded text-sm ${
                          techIndex % 2 === 0
                            ? "bg-primary/20 text-primary"
                            : "bg-accent/20 text-accent"
                        }`}
                        data-testid={`project-tech-${index}-${techIndex}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.demoLink || "#"}
                      className="text-primary hover:text-primary/80 font-medium flex items-center"
                      data-testid={`project-demo-${index}`}
                    >
                      <ExternalLink className="mr-2" size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.codeLink || "#"}
                      className="text-muted-foreground hover:text-foreground font-medium flex items-center"
                      data-testid={`project-code-${index}`}
                    >
                      <Github className="mr-2" size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-lg"
            data-testid="link-view-all-projects"
          >
            View All Projects
            <ExternalLink className="ml-2" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

import { Code, Brain, Gamepad2, Mountain } from "lucide-react";

export default function About() {
  const interests = [
    { icon: Code, label: "Open Source" },
    { icon: Brain, label: "AI & ML" },
    { icon: Gamepad2, label: "Game Development" },
    { icon: Mountain, label: "Hiking" },
  ];

  const coursework = [
    "Data Structures",
    "Algorithms",
    "Web Development",
    "Database Systems",
    "Machine Learning",
  ];

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground">Get to know me better</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
              alt="John working on a computer with code on screen"
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="about-image"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold gradient-text">Education & Background</h3>

            <div className="space-y-4">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Bachelor of Science - Computer Science</h4>
                <p className="text-muted-foreground mb-2">University of Technology</p>
                <p className="text-sm text-muted-foreground">Expected Graduation: May 2025 | GPA: 3.8/4.0</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Relevant Coursework</h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {coursework.map((course, index) => (
                    <span
                      key={course}
                      className={`px-3 py-1 rounded-full text-sm ${
                        index % 2 === 0
                          ? "bg-primary/20 text-primary"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-xl font-semibold mb-4">Interests & Hobbies</h4>
              <div className="grid grid-cols-2 gap-4">
                {interests.map(({ icon: Icon, label }, index) => (
                  <div key={label} className="flex items-center space-x-3">
                    <Icon
                      className={`text-xl ${
                        index % 2 === 0 ? "text-primary" : "text-accent"
                      }`}
                      size={20}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

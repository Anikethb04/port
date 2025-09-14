import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message! This is a demo form.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "john.doe@email.com",
      href: "mailto:john.doe@email.com",
      color: "primary",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "(123) 456-7890",
      href: "tel:+1234567890",
      color: "accent",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      href: "#",
      color: "primary",
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "primary" },
    { icon: Github, href: "#", color: "accent" },
    { icon: Twitter, href: "#", color: "primary" },
    { icon: Instagram, href: "#", color: "accent" },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground">Let's discuss opportunities and collaborations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Let's Connect!</h3>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always interested in new opportunities, whether that's an internship,
              full-time role, or collaborative project. Feel free to reach out if you'd
              like to discuss how we can work together.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, title, value, href, color }) => (
                <div key={title} className="flex items-center space-x-4">
                  <div className={`bg-${color}/20 p-3 rounded-full`}>
                    <Icon className={`text-${color} text-xl`} size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{title}</h4>
                    <a
                      href={href}
                      className={`text-muted-foreground hover:text-${color}`}
                      data-testid={`contact-${title.toLowerCase()}`}
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-6 mt-8">
              {socialLinks.map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`bg-${color}/20 hover:bg-${color} hover:text-${color}-foreground p-4 rounded-full transition-all duration-300`}
                  data-testid={`social-link-${index}`}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  data-testid="input-subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                  data-testid="input-message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                data-testid="button-send-message"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

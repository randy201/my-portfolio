import type { Dictionary } from "@/types/dictionary";

const en = {
  meta: {
    titleTemplate: "%s | Randy Anne Rajaonson",
    defaultTitle: "Randy Anne Rajaonson — .NET / Next.js (React) Developer",
    description:
      "I'm a full stack developer. I'm passionate about technology, which turned my job into a dream come true.",
  },
  nav: {
    projects: "Projects",
    skills: "Skills",
    services: "What I do",
    contact: "Contact",
    availability: "Available for freelance",
  },
  hero: {
    kicker: "PORTFOLIO",
    name: "RAJAONSON Randy Anne",
    role: ".NET / Next.js (React) Developer",
    tagline:
      "With my wand (a computer + the internet) I bring your projects to life, and then some",
    bio: "I'm a full stack developer. I'm passionate about technology, which turned my job into a dream come true.",
    downloadCv: "Download my CV",
    contactCta: "Get in touch",
  },
  projects: {
    heading: "Selected",
    subheading: "projects",
    intro: "A selection of recent projects showcasing my design and development work.",
    viewAll: "View all projects",
    viewProject: "View project",
  },
  skills: {
    heading: "Skills",
    subheading: "& expertise",
    quote:
      "I design and build applications that aren't just functional, but also clean, robust and enjoyable to use.",
  },
  services: {
    heading: "What",
    subheading: "I do",
    processHeading: "My process",
  },
  tools: {
    heading: "Tools",
    subheading: "I use",
  },
  contact: {
    heading: "Let's talk",
    subheading: "about your project",
    intro: "Got a project in mind? Reach out, I reply quickly.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send",
    formSuccess: "Message sent, thank you! I'll get back to you shortly.",
    formError: "Something went wrong, please try again.",
    availableRemote: "Available remotely",
  },
  footer: {
    rights: "All rights reserved.",
  },
} as const satisfies Dictionary;

export default en;

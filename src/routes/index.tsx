import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Toaster, toast } from "sonner";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowUp,
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Database,
  Wrench,
  Layout,
  Server,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  Search,
  Send,
  FileText,
  CheckCircle2,
  Layers,
} from "lucide-react";
import profileImg from "@/assets/profile.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Henil Patel — Software Developer Portfolio" },
      { name: "description", content: "Fresher Software, Frontend & Python Developer. Portfolio with projects, skills, education, experience and contact." },
    ],
  }),
});

// ---------- Data ----------
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["Software Developer", "Frontend Developer", "Python Developer"];

const SKILL_GROUPS = [
  {
    title: "Programming",
    icon: Code2,
    items: [
      { name: "Python", level: 90 },
      { name: "Java", level: 80 },
      { name: "C", level: 75 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    items: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
      { name: "React", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 72 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [
      { name: "MySQL", level: 82 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 92 },
      { name: "Postman", level: 78 },
    ],
  },
];

const PROJECTS = [
  {
    title: "ExpenseMate",
    category: "Android Application",
    desc: "Android-based expense management application designed to help users conveniently record, monitor, and analyze daily income & expenses with real-time balance calculation.",
    fullDesc:
      "ExpenseMate is an Android-based personal finance management application developed to replace traditional paper-based record keeping with a digital, portable, and user-friendly platform. Built using Android Studio with Java for backend business logic, XML for responsive UI layouts, Firebase for cloud data storage, real-time synchronization & authentication support, and SQLite/Room for local storage.",
    features: [
      "User Login & Secure Authentication",
      "Add, Edit & Delete Daily Income and Expense Records",
      "Category-wise Expense & Income Tracking (Food, Travel, Bills, Shopping, etc.)",
      "Real-time Balance & Automatic Financial Summary Calculation",
      "Daily & Monthly Summarized Reports and Insights",
      "Budget Management & Financial Goal Tracking",
      "Offline Data Storage (SQLite/Room) and Cloud Synchronization (Firebase)",
    ],
    tech: ["Android Studio", "Java", "XML", "Firebase", "SQLite"],
    gradient: "from-sky-500/40 to-cyan-500/40",
    image: "/projects/ExpenseMate.jpeg",
    objectFit: "contain" as const,
  },
  {
    title: "WanderWay",
    category: "Tourism Management System",
    desc: "Comprehensive full-stack tourism management platform unifying travel planning, multi-mode package bookings, eco-tourism recommendations, user reviews, and admin analytics.",
    fullDesc:
      "WanderWay is a next-generation tourism management system designed to eliminate fragmented travel planning by providing an all-in-one digital hub for travelers and industry stakeholders. Developed using React for frontend UI, Node.js & Express.js for backend REST APIs, Prisma ORM, and MySQL database. It emphasizes sustainable eco-tourism while offering an all-in-one platform for trip customization, destination discovery, real-time alerts, and vendor management.",
    features: [
      "Centralized Travel Planning & Multi-Mode Transport Booking (Flights, Hotels, Tours)",
      "Eco-Tourism Filter for Sustainable & Environmentally Responsible Travel",
      "Personalized Trip Recommendations based on User Preferences & Budget",
      "Real-Time Updates & Alerts (Weather, Transport, Destinations)",
      "Community Travel Reviews, Ratings & Photo Sharing",
      "Admin Control Dashboard for Vendor Management, User Roles & Analytics Reports",
      "Type-Safe ORM Database Management with Prisma & MySQL",
    ],
    tech: ["React", "Node.js", "Express.js", "Prisma", "MySQL", "JavaScript"],
    gradient: "from-blue-500/40 to-indigo-500/40",
    image: "/projects/wanderway.png",
  },
];

const CERTS = [
  {
    title: "Python for Data Science",
    issuer: "NPTEL / IIT Madras (MoE, Govt. of India)",
    date: "Jul - Aug 2024",
    badge: "Elite (70%)",
    desc: "4-week course covering Python programming, data science libraries, and data analysis with a 70% consolidated Elite score.",
    file: "/certificates/nptel_python_data_science.pdf",
    link: "",
    tags: ["Python", "Data Science", "NPTEL", "IIT Madras"],
  },
  {
    title: "GenAI Powered Data Analytics Simulation",
    issuer: "TATA & Forage",
    date: "March 2026",
    badge: "Job Simulation",
    desc: "Completed practical tasks in exploratory data analysis, risk profiling, delinquency prediction with AI, and business storytelling.",
    file: "/certificates/tata_genai_data_analytics.pdf",
    link: "",
    tags: ["GenAI", "Data Analytics", "TATA", "AI"],
  },
  {
    title: "Frontend Developer Internship",
    issuer: "Shambhavi Technovation",
    date: "Jul 2025 - Aug 2025",
    badge: "Internship",
    desc: "Completed frontend web development internship with hands-on exposure to AngularJS, Bootstrap, and Node.js.",
    file: "/certificates/shambhavi_technovation_internship.pdf",
    link: "",
    tags: ["Frontend", "AngularJS", "Bootstrap", "Node.js"],
  },
  {
    title: "Internship Completion (.NET & Angular)",
    issuer: "TatvaSoft",
    date: "May 2025 - Jun 2025",
    badge: "Internship",
    desc: "Completed a 15-day software internship developing web application modules using .NET framework and Angular.",
    file: "/certificates/tatvasoft_internship.pdf",
    link: "",
    tags: [".NET", "Angular", "C#", "Web Dev"],
  },
  {
    title: "Workshop on 'Innovating the Future'",
    issuer: "IEEE Student Branch & LDRP-ITR",
    date: "Sep 27, 2024",
    badge: "IEEE Workshop",
    desc: "Active participation in emerging tech workshop organized by Department of Information Technology & IEEE Student Branch.",
    file: "/certificates/ieee_innovating_the_future.pdf",
    link: "",
    tags: ["IEEE", "Information Technology", "Workshop"],
  },
];

const EXPERIENCES = [
  {
    role: "Frontend Developer Intern",
    company: "Shambhavi Technovation",
    period: "01-07-25 to 11-08-25",
    location: "Ahmedabad, Gujarat",
    tech: ["AngularJS", "Bootstrap", "Node.js", "JavaScript"],
    responsibilities: [
      "Gained hands-on exposure building interactive user interface modules using AngularJS and Bootstrap.",
      "Integrated REST API endpoints and backend services built with Node.js.",
      "Collaborated on responsive design patterns and client-side logic.",
    ],
    achievements: [
      "Completed full internship deliverables on schedule.",
      "Received Frontend Developer Internship Certificate.",
    ],
  },
  {
    role: "Software Development Intern (.NET & Angular)",
    company: "TatvaSoft",
    period: "26-05-25 to 13-06-25",
    location: "Ahmedabad, Gujarat",
    tech: [".NET", "Angular", "C#", "SQL"],
    responsibilities: [
      "Worked on web application modules using .NET framework and Angular.",
      "Demonstrated sincere effort, learning speed, and problem-solving skills across team assignments.",
    ],
    achievements: [
      "Successfully completed 15-day software development internship program.",
      "Awarded Internship Completion Certificate by TatvaSoft HR Dept.",
    ],
  },
];

const ACHIEVEMENTS = [
  {
    title: "NPTEL Elite Certification",
    desc: "Scored 70% Elite rating in Python for Data Science certified by IIT Madras & Ministry of Education, Govt. of India.",
  },
  {
    title: "GenAI Data Analytics Job Simulation",
    desc: "Completed TATA Group simulation via Forage in Exploratory Data Analysis, AI Risk Profiling & Business Storytelling.",
  },
  {
    title: "Frontend Developer Internship",
    desc: "Shipped hands-on frontend web features at Shambhavi Technovation using AngularJS, Bootstrap, and Node.js.",
  },
  {
    title: "TatvaSoft Software Internship",
    desc: "Successfully completed software development internship program working on .NET & Angular technologies.",
  },
  {
    title: "IEEE Technology Workshop",
    desc: "Participated in 'Innovating the Future' workshop organized by Dept. of IT & IEEE Student Branch at LDRP-ITR.",
  },
  {
    title: "Academic Excellence",
    desc: "Achieved 8.48 CGPA in B.E. Information Technology at LDRP Institute of Technology and Research, Gandhinagar.",
  },
];

const STATS = [
  { label: "B.E. IT CGPA", value: 8.48, suffix: "" },
  { label: "Certifications", value: 5, suffix: "" },
  { label: "Projects", value: 2, suffix: "" },
  { label: "Technologies", value: 12, suffix: "+" },
];

// ---------- Hooks ----------
function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const timeout = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, del, i, words, speed, pause]);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

// ---------- Component ----------
function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectQuery, setProjectQuery] = useState("");
  const [techFilter, setTechFilter] = useState<string>("All");
  const typed = useTypewriter(ROLES);
  const active = useActiveSection();
  useScrollReveal();

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const allTech = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech)))],
    [],
  );
  const filteredProjects = PROJECTS.filter(
    (p) =>
      (techFilter === "All" || p.tech.includes(techFilter)) &&
      (projectQuery === "" ||
        p.title.toLowerCase().includes(projectQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(projectQuery.toLowerCase())),
  );

  return (
    <div className="min-h-screen">
      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" richColors />

      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
          </div>
        </div>
      )}

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass bg-background/85 backdrop-blur-xl border-b border-border/40 shadow-elegant" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold">
            <span className="gradient-text">Henil</span>
            <span className="text-foreground">.dev</span>
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`relative rounded-full px-2.5 py-2 text-xs font-medium transition-colors hover:text-primary xl:px-3 xl:text-sm ${
                    active === n.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                  {active === n.id && (
                    <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle theme"
              className="glass rounded-full p-2 transition-all hover:scale-110 hover:text-primary"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="glass rounded-full p-2 lg:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="glass border-t border-border lg:hidden">
            <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 p-3 sm:grid-cols-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollTo(n.id)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-primary/10 ${
                      active === n.id ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="pt-20">
        <HeroSection typed={typed} onNav={scrollTo} />
        <StatsBar />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection
          projects={filteredProjects}
          allTech={allTech}
          techFilter={techFilter}
          setTechFilter={setTechFilter}
          projectQuery={projectQuery}
          setProjectQuery={setProjectQuery}
        />
        <ResumeSection />
        <CertificationsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow transition-all hover:scale-110 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

// ---------- Sections ----------
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mb-12 text-center">
      <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full gradient-primary" />
    </div>
  );
}

function HeroSection({ typed, onNav }: { typed: string; onNav: (id: string) => void }) {
  return (
    <section id="home" className="relative flex min-h-[calc(100vh-5rem)] items-center px-4 md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:gap-12 md:py-16">
        {/* Text — shown second on mobile (order-2), first on md+ */}
        <div className="animate-fade-up order-2 text-center md:order-1 md:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            👋 Hello, I'm
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="gradient-text">Henil Patel</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-baseline justify-center gap-2 text-xl font-semibold text-muted-foreground sm:text-2xl md:justify-start md:text-3xl">
            <span>I'm a</span>
            <span className="text-primary">{typed}</span>
            <span className="animate-blink text-primary">|</span>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:mx-0 md:text-lg">
            A passionate fresher developer with a love for clean code, elegant UI and
            solving real-world problems. I build fast, accessible web experiences and
            keep learning every day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="/resume/Henil_Patel_Resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 sm:px-6 sm:py-3"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <button
              onClick={() => onNav("contact")}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 hover:text-primary sm:px-6 sm:py-3"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-4 md:justify-start">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/henil-patel-845a34303/", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/Henil140804", label: "GitHub" },
              { icon: Mail, href: "mailto:patelhenu2004@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass grid h-11 w-11 place-items-center rounded-full transition-all hover:scale-110 hover:text-primary hover:shadow-glow"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Photo — shown first on mobile (order-1), second on md+ */}
        <div className="relative animate-fade-up order-1 justify-self-center [animation-delay:150ms] md:order-2">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-3xl" />
          <div className="animate-floaty relative">
            <div className="absolute -inset-3 rounded-full animate-spin-slow" style={{ background: "conic-gradient(from 0deg, oklch(0.68 0.18 245), oklch(0.78 0.16 215), oklch(0.88 0.12 190), oklch(0.68 0.18 245))", padding: "3px", borderRadius: "9999px" }} />
            <div className="absolute -inset-5 rounded-full border-2 border-primary/20 shadow-glow" />
            <div className="absolute -inset-4 rounded-full gradient-primary opacity-30 blur-xl" />
            <div className="relative overflow-hidden rounded-full border-4 border-primary/60 shadow-glow" style={{ padding: "4px", background: "var(--gradient-primary)", borderRadius: "9999px" }}>
              <div className="overflow-hidden rounded-full">
                <img
                  src={profileImg}
                  alt="Henil Patel — Software Developer"
                  width={400}
                  height={400}
                  className="h-48 w-48 object-cover sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [n, setN] = useState<number | string>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isFloat = !Number.isInteger(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const dur = 1400;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            setN(isFloat ? Number((p * target).toFixed(2)) : Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target, isFloat]);

  return <span ref={ref}>{n}{suffix}</span>;
}

function StatsBar() {
  return (
    <section className="px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass reveal grid grid-cols-2 gap-4 rounded-2xl p-5 md:grid-cols-4 md:p-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold gradient-text sm:text-3xl md:text-4xl">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs md:text-sm font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const info = [
    { label: "Name", value: "Henil Patel" },
    { label: "Degree", value: "B.E. Information Technology (CGPA 8.48)" },
    { label: "Email", value: "patelhenu2004@gmail.com" },
    { label: "Phone", value: "+91 9328720145" },
    { label: "Location", value: "Ahmedabad, Gujarat" },
    { label: "Languages", value: "English, Hindi, Gujarati" },
  ];
  return (
    <section id="about" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="About Me" title="Who I Am" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="reveal glass rounded-2xl p-8 shadow-card">
            <h3 className="mb-3 font-display text-2xl font-bold text-primary">Professional Summary</h3>
            <p className="text-muted-foreground">
              I'm a B.E. Information Technology graduate from LDRP-ITR, Gandhinagar with a CGPA of 8.48.
              I specialize in building responsive web interfaces with React, crafting clean backend logic,
              and solving real-world problems through well-structured code. With hands-on internship
              experience at TatvaSoft and Shambhavi Technovation, I've worked across the full stack
              using technologies like Python, Java, JavaScript, Node.js, and SQL.
            </p>
            <h3 className="mb-3 mt-6 font-display text-2xl font-bold text-primary">Career Objective</h3>
            <p className="text-muted-foreground">
              To secure a software development role where I can apply my skills in full-stack
              development, contribute to impactful products, and continue growing as an engineer
              alongside a driven and collaborative team.
            </p>
          </div>
          <div className="reveal glass rounded-2xl p-8 shadow-card">
            <h3 className="mb-5 font-display text-2xl font-bold text-primary">Personal Info</h3>
            <ul className="space-y-3">
              {info.map((i) => (
                <li key={i.label} className="flex flex-col gap-0.5 border-b border-border/60 pb-2 last:border-none sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{i.label}</span>
                  <span className="break-all text-sm font-medium sm:break-normal sm:text-right">{i.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setW(level);
          io.disconnect();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [level]);
  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full gradient-primary transition-all duration-1000 ease-out"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="My Toolkit" title="Skills & Expertise" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="reveal glass rounded-2xl p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">{g.title}</h3>
              </div>
              <div className="space-y-4">
                {g.items.map((i) => (
                  <SkillBar key={i.name} name={i.name} level={i.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Journey" title="Education" />
        <div className="relative space-y-8">
          {/* Timeline line — always on left on mobile, centered on md+ */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2" />

          <div className="reveal relative pl-14 md:pl-0">
            <div className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full gradient-primary shadow-glow md:left-1/2 md:-translate-x-1/2">
              <GraduationCap className="h-3 w-3 text-primary-foreground" />
            </div>
            <div className="glass rounded-2xl p-5 shadow-card md:ml-[calc(50%+2rem)] md:max-w-lg">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  2022 – 2026
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-0.5 text-xs font-bold text-primary">
                  CGPA: 8.48
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">Bachelors in Engineering</h3>
              <p className="text-primary font-semibold">Information Technology</p>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                LDRP Institute of Technology and Research (LDRP-ITR), Gandhinagar
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Specializing in Data Science, Python, SQL, Machine Learning, Web Development, and DBMS.
              </p>
            </div>
          </div>

          <div className="reveal relative pl-14 md:pl-0">
            <div className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full gradient-primary shadow-glow md:left-1/2 md:-translate-x-1/2">
              <GraduationCap className="h-3 w-3 text-primary-foreground" />
            </div>
            <div className="glass rounded-2xl p-5 shadow-card md:mr-[calc(50%+2rem)] md:max-w-lg md:text-right">
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  2020 – 2022
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-0.5 text-xs font-bold text-primary">
                  HSC: 65%
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">Higher Secondary (HSC)</h3>
              <p className="text-primary font-semibold">Science Stream</p>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                Knowledge High School, Nadiad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({
  projects,
  allTech,
  techFilter,
  setTechFilter,
  projectQuery,
  setProjectQuery,
}: {
  projects: typeof PROJECTS;
  allTech: string[];
  techFilter: string;
  setTechFilter: (v: string) => void;
  projectQuery: string;
  setProjectQuery: (v: string) => void;
}) {
  const [modal, setModal] = useState<(typeof PROJECTS)[number] | null>(null);
  return (
    <section id="projects" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="My Work" title="Featured Projects" />

        <div className="reveal mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={projectQuery}
              onChange={(e) => setProjectQuery(e.target.value)}
              className="glass border-border pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTech.map((t) => (
              <button
                key={t}
                onClick={() => setTechFilter(t)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  techFilter === t
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "glass hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              onClick={() => setModal(p)}
              className="reveal group glass flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl shadow-card transition-all hover:-translate-y-2 hover:shadow-glow"
            >
              <div>
                <div
                  className={`relative flex h-44 w-full items-center justify-center bg-gradient-to-br ${p.gradient} overflow-hidden transition-transform group-hover:scale-105`}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${
                        p.objectFit === "contain" ? "object-contain p-3" : "object-cover"
                      }`}
                    />
                  ) : (
                    <Code2 className="h-14 w-14 text-primary-foreground/80" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  {p.category && (
                    <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md">
                      {p.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal(p);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <FileText className="h-4 w-4" /> View Project Details
                </button>
              </div>
            </article>
          ))}
          {projects.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">No projects match your filters.</p>
          )}
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setModal(null)}
        >
          <div
            className="glass relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${modal.gradient} overflow-hidden`}>
              {modal.image ? (
                <img
                  src={modal.image}
                  alt={modal.title}
                  className={`h-full w-full ${
                    modal.objectFit === "contain" ? "object-contain p-4" : "object-cover"
                  }`}
                />
              ) : (
                <Code2 className="h-20 w-20 text-primary-foreground/80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {modal.category && (
                <span className="absolute left-6 top-6 rounded-full border border-primary/40 bg-background/80 px-3.5 py-1 text-xs font-bold text-primary backdrop-blur-md">
                  {modal.category}
                </span>
              )}
            </div>
            <button
              onClick={() => setModal(null)}
              className="glass absolute right-4 top-4 z-10 rounded-full p-2 hover:text-primary transition-all"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-3xl font-bold gradient-text">{modal.title}</h3>
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Engineering Project Report
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 font-normal">
                {modal.fullDesc || modal.desc}
              </p>

              {modal.features && modal.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-display text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Key Features & Capabilities
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {modal.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-muted/40 p-3 text-xs md:text-sm font-medium text-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modal.tech.map((t) => (
                    <span key={t} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end border-t border-border/40 pt-4">
                <button
                  onClick={() => setModal(null)}
                  className="glass rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:text-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ResumeSection() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const resumeUrl = "/resume/Henil_Patel_Resume.pdf";

  return (
    <section id="resume" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Credentials" title="My Resume" />
        <div className="reveal glass grid grid-cols-1 gap-8 rounded-2xl p-8 shadow-card md:grid-cols-2 md:items-center">
          <div
            onClick={() => setShowResumeModal(true)}
            className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border border-primary/30 bg-muted transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0`}
              title="Henil Patel Resume Preview"
              className="pointer-events-none h-full w-full border-none opacity-90 transition-opacity group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 p-6 text-center backdrop-blur-[2px] transition-opacity group-hover:bg-background/50">
              <div className="grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
                <FileText className="h-7 w-7" />
              </div>
              <p className="mt-3 font-display text-lg font-bold text-foreground">Henil_Patel_Resume.pdf</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-4 py-1.5 text-xs font-semibold text-primary shadow-glow">
                <ExternalLink className="h-3.5 w-3.5" /> Tap to Open Interactive Resume
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">Take a closer look</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Explore my full background — B.E. Information Technology (CGPA 8.48), Data Science, AI/ML, Python, SQL, and full-stack software development experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowResumeModal(true)}
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-all hover:scale-105 hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" /> View Resume
              </button>
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal Popup */}
      {showResumeModal && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="glass relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl p-6 shadow-elegant md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowResumeModal(false)}
              className="glass absolute right-4 top-4 rounded-full p-2 hover:text-primary transition-all"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Official Resume
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold">Henil Patel — Resume</h3>
              </div>
            </div>

            {/* Embedded Live Resume Document Viewer */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background shadow-inner">
              <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5 text-xs font-semibold text-foreground">
                <span>📄 Interactive Resume Document Viewer</span>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  Open Full Screen <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <iframe
                src={`${resumeUrl}#toolbar=0&navpanes=0`}
                title="Henil Patel Resume Document"
                className="h-[50vh] min-h-[300px] w-full border-none sm:h-[600px]"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/40 pt-4">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" /> Open Full Document in New Tab
              </a>
              <a
                href={resumeUrl}
                download
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:text-primary"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
              <button
                onClick={() => setShowResumeModal(false)}
                className="glass rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:text-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<(typeof CERTS)[number] | null>(null);

  return (
    <section id="certifications" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Credentials & Training" title="Certifications & Workshops" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c) => (
            <div
              key={c.title}
              onClick={() => setActiveCert(c)}
              className="reveal glass group relative flex cursor-pointer flex-col justify-between rounded-2xl p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {c.badge && (
                      <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {c.badge}
                      </span>
                    )}
                    {c.date && (
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {c.date}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-1 text-xs font-semibold text-primary">Issued by {c.issuer}</p>
                {c.desc && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">{c.desc}</p>
                )}
                {c.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-primary transition-all group-hover:bg-primary/20">
                  View Certificate <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Certificate Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="glass relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-elegant md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCert(null)}
              className="glass absolute right-4 top-4 rounded-full p-2 hover:text-primary transition-all"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <Award className="h-6 w-6" />
              </div>
              <div>
                {activeCert.badge && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {activeCert.badge}
                  </span>
                )}
                <h3 className="mt-1 font-display text-2xl font-bold">{activeCert.title}</h3>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-y border-border/60 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-medium text-muted-foreground">Issuing Organization:</span>
                <span className="font-semibold text-foreground">{activeCert.issuer}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-medium text-muted-foreground">Date / Issue Period:</span>
                <span className="font-semibold text-foreground">{activeCert.date}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Details & Scope</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{activeCert.desc}</p>
            </div>

            {/* Embedded Live PDF Document Viewer */}
            {activeCert.file && activeCert.file !== "#" && (
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background shadow-inner">
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5 text-xs font-semibold text-foreground">
                  <span>📄 Original Certificate Document Preview</span>
                  <a
                    href={activeCert.file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    Open Full Screen <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <iframe
                  src={`${activeCert.file}#toolbar=0&navpanes=0`}
                  title={activeCert.title}
                  className="h-[40vh] min-h-[260px] w-full border-none sm:h-[450px]"
                />
              </div>
            )}

            {activeCert.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeCert.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/40 pt-4">
              {activeCert.file && activeCert.file !== "#" ? (
                <>
                  <a
                    href={activeCert.file}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4" /> Open Full Document in New Tab
                  </a>
                  <a
                    href={activeCert.file}
                    download
                    className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:text-primary"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </>
              ) : null}
              <button
                onClick={() => setActiveCert(null)}
                className="glass rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:text-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Experience" title="Work & Internships" />
        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company + exp.role} className="reveal glass rounded-2xl p-8 shadow-card">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {exp.period}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h4 className="mb-2 mt-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">Responsibilities</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">Achievements</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exp.achievements.map((a, i) => (
                      <li key={i}>• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Milestones" title="Achievements" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="reveal glass rounded-2xl p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "patelhenu2004@gmail.com";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error("Please enter a valid email");
    if (form.subject.trim().length < 3) return toast.error("Subject is too short");
    if (form.message.trim().length < 10) return toast.error("Message should be at least 10 characters");
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const info = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: "+91 9328720145", href: "tel:+919328720145" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/henil-patel-845a34303", href: "https://www.linkedin.com/in/henil-patel-845a34303/" },
    { icon: Github, label: "GitHub", value: "github.com/Henil140804", href: "https://github.com/Henil140804" },
    { icon: MapPin, label: "Location", value: "Ahmedabad, Gujarat", href: "#" },
  ];

  return (
    <section id="contact" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Get In Touch" title="Let's Connect" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="reveal glass rounded-2xl p-8 shadow-card">
            <h3 className="font-display text-2xl font-bold">Contact Information</h3>
            <p className="mt-2 text-muted-foreground">
              I'm always open to interesting opportunities, collaborations and a friendly chat.
            </p>
            <ul className="mt-6 space-y-4">
              {info.map((i) => (
                <li key={i.label} className="flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <i.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{i.label}</p>
                    <a href={i.href} className="block break-all text-sm font-semibold hover:text-primary sm:truncate">
                      {i.value}
                    </a>
                  </div>
                  {i.label === "Email" && (
                    <button
                      onClick={copyEmail}
                      className="glass grid h-9 w-9 place-items-center rounded-full transition-all hover:text-primary"
                      aria-label="Copy email"
                    >
                      {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="reveal glass space-y-4 rounded-2xl p-8 shadow-card">
            <h3 className="font-display text-2xl font-bold">Send a Message</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="glass border-border"
                  maxLength={80}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className="glass border-border"
                  maxLength={120}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Subject</label>
              <Input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
                className="glass border-border"
                maxLength={120}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me a bit about your project or idea..."
                className="glass min-h-[140px] border-border"
                maxLength={1000}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full gradient-primary py-6 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted-foreground">© 2026 Henil Patel. All rights reserved.</p>
        <p className="text-sm text-muted-foreground">
          Designed with <span className="text-primary">❤</span> by <span className="font-semibold gradient-text">Henil Patel</span>
        </p>
        <div className="flex gap-3">
          {[
            { icon: Linkedin, href: "https://www.linkedin.com/in/henil-patel-845a34303/", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/Henil140804", label: "GitHub" },
            { icon: Mail, href: "mailto:patelhenu2004@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="glass grid h-10 w-10 place-items-center rounded-full transition-all hover:scale-110 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

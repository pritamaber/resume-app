import { useEffect } from "react";
import { useResumeData } from "./useResumeData";

export const useDummyResumeData = () => {
  const { updateSection } = useResumeData();

  useEffect(() => {
    updateSection("contact", {
      name: "Aarav Mehta",
      email: "aarav.mehta@example.com",
      phone: "+91 9876543210",
      linkedin: "https://linkedin.com/in/aaravmehta",
    });

    updateSection(
      "summary",
      "Software engineer with 3+ years of experience building scalable web apps using React and Node.js. Passionate about performance, clean UI, and solving real-world problems through code."
    );

    updateSection("education", [
      {
        school: "Indian Institute of Technology, Bombay",
        degree: "B.Tech in Computer Science",
        year: "2022",
      },
      {
        school: "Kendriya Vidyalaya",
        degree: "High School",
        year: "2018",
      },
    ]);

    updateSection("experience", [
      {
        company: "TCS Digital",
        role: "Full Stack Developer",
        duration: "July 2022 – Present",
        description:
          "Built and maintained internal tools using React, Node.js, and PostgreSQL. Reduced data processing time by 40% through optimized queries and caching.",
      },
      {
        company: "Internshala",
        role: "Frontend Intern",
        duration: "Jan 2022 – May 2022",
        description:
          "Developed reusable UI components with Tailwind CSS and improved homepage performance score from 68 to 91.",
      },
    ]);

    updateSection("skills", [
      "JavaScript",
      "React",
      "Node.js",
      "Tailwind CSS",
      "MongoDB",
      "Express.js",
      "Git",
      "Teamwork",
    ]);

    updateSection("projects", [
      {
        title: "TaskSync",
        description:
          "A Kanban-style task manager built with MERN stack, featuring drag-and-drop and real-time collaboration using Socket.IO.",
        link: "https://github.com/aaravmehta/task-sync",
      },
      {
        title: "WeatherWise",
        description:
          "React app that displays real-time weather using OpenWeather API, with animated weather icons and offline caching.",
        link: "https://weatherwise.netlify.app",
      },
    ]);

    updateSection("certificates", [
      {
        title: "Full Stack Web Development",
        issuer: "freeCodeCamp",
        year: "2023",
      },
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        year: "2022",
      },
    ]);

    // ✅ Add custom sections here
    updateSection("customSections", [
      {
        title: "Languages",
        items: ["English (Fluent)", "Hindi (Native)", "Spanish (Basic)"],
      },
      {
        title: "Volunteering",
        items: [
          "Mentored 30+ students in JavaScript at CodeForIndia Bootcamp 2023",
          "Organized a 24-hour AI Hackathon during IIT Bombay TechFest",
        ],
      },
      {
        title: "Achievements",
        items: [
          "Top 5 finalist in Google Solution Challenge 2023",
          "Winner of TCS CodeVita 2022 (National level)",
        ],
      },
      {
        title: "Interests",
        items: [
          "Open Source Contributions",
          "UI/UX Design",
          "Chess (District Level Player)",
        ],
      },
    ]);
  }, []);
};

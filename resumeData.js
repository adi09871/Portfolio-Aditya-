export const resumeData = {
  personalInfo: {
    name: "Aditya",
    title: "Android Developer & Kotlin Expert",
    phone: "+91-7065675017",
    email: "adit10022004@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-7125692a1/",
    github: "https://github.com/adi09871",
    location: "New Delhi, India",
    availability: "Available for Full-time Roles & Internships",
    bio: "Passionate Android Developer specializing in building high-performance, offline-first mobile applications using Kotlin, Jetpack Compose, and modern design architectures. Experienced in full-stack mobile systems with Spring Boot, PostgreSQL, and Google Play Console release management."
  },
  education: [
    {
      institution: "Guru Gobind Singh Indraprastha University",
      degree: "Bachelor of Technology in Computer Science",
      timeline: "Nov 2022 – June 2026",
      details: "Focus on Software Engineering, Database Systems, and Mobile Application Development."
    }
  ],
  experience: [
    {
      role: "Android Application Developer Intern",
      company: "Spaak Kai LLP",
      timeline: "April 2026 - May 2026",
      points: [
        "Developed a Virtual Try-On Android application using Kotlin and Jetpack Compose, focusing on modern UI design and a responsive user experience.",
        "Implemented MVVM (Model-View-ViewModel) architecture and Jetpack Compose state management to build a scalable, maintainable, and modular codebase.",
        "Integrated Supabase for backend data management, enabling efficient data storage, retrieval, and synchronization through RESTful APIs.",
        "Followed clean architecture principles and modular development practices to improve code reusability and simplify future feature enhancements (project currently in development phase)."
      ]
    },
    {
      role: "Community and Outreach Intern",
      company: "Hack2skill",
      timeline: "September 2024 - November 2024",
      points: [
        "Promoted technical challenges and hackathons by engaging with developer communities and driving participation through targeted outreach.",
        "Managed community communications and announcements across platforms, contributing to a 30% increase in user engagement and participation.",
        "Collaborated with cross-functional teams (marketing, tech, and operations) to execute campaigns, streamline outreach strategies, and enhance event visibility."
      ]
    }
  ],
  projects: [
    {
      id: "trackmybus",
      title: "TrackMyBus",
      subtitle: "Real-Time Bus Tracking System",
      skills: ["Kotlin", "Jetpack Compose", "Spring Boot", "PostgreSQL", "Firebase FCM", "REST APIs", "Foreground Services"],
      github: "https://github.com/adi09871/Track_my_bus",
      details: [
        "Built a full-stack real-time bus tracking app for students and drivers using Kotlin, Jetpack Compose (Android), and Spring Boot + PostgreSQL (backend), deployed on Render Cloud.",
        "Implemented live GPS tracking via foreground services with role-based auth for students and drivers, covering trip lifecycle, route, stop, and occupancy management.",
        "Integrated Firebase FCM for real-time push notifications on trip status updates and developed backend REST APIs using Spring Boot, Hibernate/JPA, and PostgreSQL.",
        "Published on Google Play Console with closed testing, foreground location permission compliance, and privacy policy setup — handling full release management end to end."
      ],
      playstore: "Closed Testing Beta",
      challenge: "Handling battery optimizations and continuous GPS coordinates logging in Android background/foreground services without triggering OS-level service termination."
    },
    {
      id: "pregnancytracker",
      title: "Pregnancy Vitals Tracker",
      subtitle: "Offline-First Health Vitals Tracker",
      skills: ["Kotlin", "Jetpack Compose", "Room DB", "WorkManager", "MVVM"],
      github: "https://github.com/adi09871/-Pregnancy-Vitals-Tracker-with-Reminders",
      details: [
        "Built offline-first health app using Room Database for secure local storage of medical logs with no internet dependency.",
        "Implemented WorkManager for reliable periodic reminders for medication and check-ups, persisting even after device reboots.",
        "Designed UI with Jetpack Compose and MVVM, cleanly separating UI state from business logic for maintainable code."
      ],
      challenge: "Ensuring WorkManager reminders persist across cold restarts and reboots, and developing a local DB migration strategy."
    },
    {
      id: "resq",
      title: "ResQ",
      subtitle: "Emergency Response Application",
      skills: ["Kotlin", "Firebase Realtime DB", "ML Kit QR", "Jetpack Compose", "Role-Based Access"],
      github: "https://github.com/adi09871/ResQ",
      details: [
        "Developed an emergency response Android app with Google ML Kit QR scanning.",
        "Integrated Firebase Realtime Database syncing critical medical data across 2 user roles (Doctors & Police) with under 1 second latency.",
        "Engineered a role-based access system ensuring only authorized personnel can view sensitive patient data during emergencies."
      ],
      challenge: "Optimizing Firebase queries and security rules to secure sensitive patient medical details while keeping search and QR loading latency under 1 second."
    }
  ],
  skills: {
    languages: ["Kotlin", "Java", "C++", "SQL", "JavaScript"],
    android: ["Jetpack Compose", "XML UI", "Activity/Fragment Lifecycle", "Navigation Graph", "Foreground Services", "WorkManager", "Room DB", "DataStore", "OkHttp", "Retrofit"],
    architecture: ["MVVM", "Clean Architecture", "Repository Pattern", "State Management", "Modularization"],
    backend: ["Spring Boot", "Hibernate/JPA", "PostgreSQL", "Firebase (FCM, Realtime DB, Auth)", "Supabase", "REST APIs"],
    tools: ["Android Studio", "IntelliJ IDEA", "Git & GitHub", "Gradle", "Google Play Console", "Logcat", "Postman"]
  },
  achievements: [
    {
      title: "Play Store Release Complete",
      description: "Successfully handled location permissions, closed testing, and released a real-time tracking system to Google Play Console."
    },
    {
      title: "Hackathon Organizer & Lead",
      description: "Led outreach for national level hackathons at Hack2skill, scaling community engagement by 30%."
    }
  ]
};

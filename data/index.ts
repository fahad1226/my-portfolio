export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
];

export const gridItems = [
    {
        id: 1,
        title: "Unlock Your Web App's Speed",
        description: "Need Performance Optimization?",
        className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
        imgClassName: "w-full h-full",
        titleClassName: "justify-end",
        img: "/b1.svg",
        spareImg: "",
    },
    {
        id: 2,
        title: "Flexible Time Zone Communication",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "",
        spareImg: "",
    },
    {
        id: 3,
        title: "My Tech Stack",
        description: "Most experienced with",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        img: "",
        spareImg: "",
    },
    {
        id: 4,
        title: "Currently Working As a Software Engineer At Fluent Conveyors",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "/grid.svg",
        spareImg: "/images/fluent-conveyors.png",
    },

    {
        id: 5,
        title: "Building an Algorithm Visualizer Web App from scratch for Easy Understanding of Basic University Algorithms",
        description: "Leisure Activity",
        className: "md:col-span-3 md:row-span-2",
        imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
        titleClassName: "justify-center md:justify-start lg:justify-center",
        img: "/images/algorithm-visualizer-new.svg",
        spareImg: "/grid.svg",
    },
    {
        id: 6,
        title: "Want to reach out?",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-center md:max-w-full max-w-60 text-center",
        img: "",
        spareImg: "",
    },
];

export const projects = [
    {
        id: 1,
        title: "3D Solar System Planets to Explore",
        des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
        img: "/p1.svg",
        iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
        link: "/ui.earth.com",
    },
    {
        id: 2,
        title: "Yoom - Video Conferencing App",
        des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
        img: "/p2.svg",
        iconLists: [
            "/next.svg",
            "/tail.svg",
            "/ts.svg",
            "/stream.svg",
            "/c.svg",
        ],
        link: "/ui.yoom.com",
    },
    {
        id: 3,
        title: "AI Image SaaS - Canva Application",
        des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
        img: "/p3.svg",
        iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
        link: "/ui.aiimg.com",
    },
    {
        id: 4,
        title: "Animated Apple Iphone 3D Website",
        des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
        img: "/p4.svg",
        iconLists: [
            "/next.svg",
            "/tail.svg",
            "/ts.svg",
            "/three.svg",
            "/gsap.svg",
        ],
        link: "/ui.apple.com",
    },
    {
        id: 5,
        title: "Animated Apple Iphone 3D Website",
        des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
        img: "/p4.svg",
        iconLists: [
            "/next.svg",
            "/tail.svg",
            "/ts.svg",
            "/three.svg",
            "/gsap.svg",
        ],
        link: "/ui.apple.com",
    },
    {
        id: 6,
        title: "Animated Apple Iphone 3D Website",
        des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
        img: "/p4.svg",
        iconLists: [
            "/next.svg",
            "/tail.svg",
            "/ts.svg",
            "/three.svg",
            "/gsap.svg",
        ],
        link: "/ui.apple.com",
    },
];

export const workExperience = [
    {
        id: 1,
        title: "Full Stack Developer Intern",
        company: "Premier University",
        desc: "Collaborated with university professors to develop a web-based platform that streamlines thesis supervision and project management for final year students. The system automates workflow, enhances communication, and improves tracking of student progress.",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
        companyLink: "https://puc.ac.bd/",
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Developer Experience Hub",
        desc: "Developed and maintained features for large-scale applications using Vue.js and Nuxt.js. Implemented 10+ key features including messaging, search, and feeds for CXBrainstorm platform. Improved application performance and fixed bugs for LiveCX platform while following scrum methodologies.",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp2.svg",
        companyLink: "https://devxhub.com/",
    },
    {
        id: 3,
        title: "Software Engineer",
        company: "Anveen Private Limited",
        desc: "Designed and implemented scalable RESTful APIs using Laravel while developing ReactJS components. Led implementation of SPA experience within WordPress using Vue.js and microservices architecture. Gained leadership experience managing a small team using Scrum/Agile methodologies. Executed comprehensive testing including unit and E2E tests for frontend and backend.",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp3.svg",
        companyLink: "https://anveen.com/",
    },
    {
        id: 4,
        title: "Lead Software Engineer",
        company: "Fluent Conveyors",
        desc: "Led development of core e-commerce projects, achieving significant performance improvements through Core Web Vitals optimization and SEO enhancements. Implemented scalable solutions that increased customer orders and achieved #1 Google ranking for key terms. Collaborated across teams to integrate frontend and backend systems while leveraging AI to accelerate development cycles and improve code quality.",
        className: "md:col-span-2",
        thumbnail: "/exp4.svg",
        companyLink: "https://www.fluentconveyors.com/",
    },
];

export const socialMedia = [
    {
        id: 1,
        img: "/git.svg",
        link: "https://github.com/fahad1226",
    },
    {
        id: 2,
        img: "/twit.svg",
        link: "https://twitter.com/fahadbinmunir",
    },
    {
        id: 3,
        img: "/link.svg",
        link: "https://www.linkedin.com/in/fahadbinmunir/",
    },
];

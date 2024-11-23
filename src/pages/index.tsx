import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Server, 
  Database, 
  Cloud, 
  Eye, 
  TrendingUp, 
  MonitorSmartphone, 
  BarChart, 
  ChevronRight,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "15+" },
  { label: "Companies worked with", value: "5+" },
];

const projects = [
  {
    title: "Bendcircular Website Enhancement",
    description: "Optimized website UI with Storyblok CMS and improved SEO metrics using Lighthouse",
    image: "/assets/bendcircular.png",
    href: "https://www.bendcircular.com/", 
  },
  {
    title: "Task Management App",
    description: "A full-featured task management application designed to enhance productivity, built with a focus on user-friendly design and efficient task organization.",
    image: "/assets/webapp.png",
    href: "https://github.com/FlaIespa/cs162-webapp",
  },
  {
    title: "Health Database",
    description: "A universal health database designed to consolidate health records globally, enabling seamless access and real-time updates for patients and healthcare providers.",
    image: "/assets/healthdatabase.png",
    href: "https://github.com/FlaIespa/HealthDatabase",
  },
  {
    title: "INBOT - AI Internal Inquiry Assistant",
    description: "An intelligent internal inquiry assistant that uses AI to streamline information retrieval within organizations, improving response time and operational efficiency.",
    image: "/assets/inbot.png",
    href: "https://github.com/FlaIespa/INBOT-AI-Internal-Inquiry-Assistant",
  },
  {
    title: "ID8",
    description: "A plataform that validates startup ideas for founders.",
    image: "/assets/startup.png",
    href: "https://github.com/ucey-star/ID8",
  },
  {
    title: "Tic-Tac-Toe",
    description: "Classic Tic-Tac-Toe game with an AI opponent using the minimax algorithm with alpha-beta pruning.",
    image: "/assets/tictactoe.png",
    href: "https://github.com/FlaIespa/CS152-AI-Tic-Tac-Toe",
  },
  {
    title: "Math Game",
    description: "Classic Tic-Tac-Toe game with an AI opponent using the minimax algorithm with alpha-beta pruning.",
    image: "/assets/mathgame.png",
    href: "https://github.com/FlaIespa/Math_game",
  },
];

const services = [
  {
    service: "Frontend Development",
    description:
      "Creating engaging user interfaces and dynamic web experiences using React.js, TypeScript, and Storyblok.",
    icon: Code2,
  },
  {
    service: "Full-Stack Development",
    description:
      "Delivering end-to-end web solutions, including frontend, backend, and seamless API integration using Flask, React.js, and Supabase.",
    icon: Server,
  },
  {
    service: "Data Engineering & ETL Pipelines",
    description:
      "Designing and implementing efficient data pipelines with tools like Apache NiFi, Pandas, and AWS Redshift to ensure seamless data processing.",
    icon: Database,
  },
  {
    service: "Cloud Solutions",
    description:
      "Leveraging AWS services like S3, Lambda, and Redshift to build scalable and secure cloud-based applications.",
    icon: Cloud,
  },
  {
    service: "Backend Development",
    description:
      "Building robust server-side applications and APIs using Python, Flask, and Express.js.",
    icon: Eye,
  },
  {
    service: "Performance Optimization",
    description:
      "Improving website performance, accessibility, and SEO metrics using tools like Lighthouse and best development practices.",
    icon: TrendingUp,
  },
  {
    service: "Responsive Design",
    description:
      "Crafting adaptable and responsive websites that offer optimal user experiences across all devices.",
    icon: MonitorSmartphone,
  },
  {
    service: "Data Visualization",
    description:
      "Creating insightful dashboards and visualizations with tools like Flask and React to enhance decision-making.",
    icon: BarChart,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>next.js</span>
              <span className={styles.pill}>python</span>
              <span className={styles.pill}>typescript</span>
              <span className={styles.pill}>react</span>
              <span className={styles.pill}>aws</span>
              <span className={styles.pill}>flask</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Flávia
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                An experienced full-stack developer with a background in computer science and cognitive neuroscience, driven by a passion for crafting seamless, 
                impactful digital experiences. With expertise in Python, JavaScript, and TypeScript, I excel in building responsive applications and scalable 
                data systems that bridge design and functionality.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:flavia.iespa@uni.minerva.edu" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m an experienced full-stack developer proficient in Python, TypeScript, React and AWS
              since 2021. My career spans various roles, from biotech, to fintech and startups, where I have been a 
              key contributor to the entire development lifecycle. My work includes designing and deploying efficient 
              data pipelines, building user-centric applications, and enhancing complex systems. 
              I am skilled in both front-end and back-end technologies, consistently delivering high-quality, 
              scalable solutions while collaborating seamlessly with cross-functional teams.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Projects */}
        <section id="projects" data-scroll-section>
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>
            
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.title} className="hover:shadow-lg">
                  <CardHeader className="p-0">
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      {project.image.endsWith(".webm") ? (
                        <video
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={300}
                          quality={100}
                          className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                        />
                      )}
                    </a>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-primary hover:underline"
                    >
                      Learn more
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      {/* Solutions for Businesses */}
      <section id="solutions" data-scroll-section className="my-64">
        <div
          data-scroll
          data-scroll-speed=".4"
          data-scroll-position="top"
          className="my-24 flex flex-col justify-start space-y-10"
        >
          <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
            🚀 Tailored Solutions
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
            Here are some of my skills
          </h2>
          <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
            I specialize in delivering innovative solutions that enhance efficiency, 
            improve user experiences, and drive measurable outcomes for businesses.
          </p>

          {/* Expertise Grid */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card key={service.service} className="hover:shadow-lg">
                <CardHeader className="flex items-center space-x-4 p-4">
                  <service.icon className="text-primary w-10 h-10" />
                  <CardTitle className="text-lg font-semibold">
                    {service.service}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
                <div className="p-4">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" data-scroll-section className="my-64">
        <div
          data-scroll
          data-scroll-speed=".4"
          data-scroll-position="top"
          className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
        >
          <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
            Let&apos;s create{" "}
            <span className="text-gradient clash-grotesk">innovative solutions</span>{" "}
            together.
          </h2>
          <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
            I specialize in full-stack development, data engineering, and cloud-based
            solutions. Let&apos;s collaborate to bring your ideas to life.
          </p>
          <Link href="mailto:flavia.iespa@uni.minerva.edu" passHref>
            <Button className="mt-6">Reach out to me</Button>
          </Link>
        </div>
      </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

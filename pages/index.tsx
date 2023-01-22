import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

import contentful from "../lib/contentful";

import UpArrow from "../components/icons/up-arrow.svg";
import ExternalLink from "../components/icons/external-link.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { User } from "../types/User";
import { Project } from "../types/Project";
import { Experience } from "../types/Experience";
import { useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import classnames from "classnames";

const NUMBER_OF_PREVIEW_PROJECTS = 4;

type Props = {
  projects: Project[];
  user: User;
  experiences: Experience[];
};

const Home = ({ user, projects, experiences }: Props) => {
  const {
    image,
    github,
    linkedin,
    name,
    resumeUrl,
    shortBio,
    title,
    twitter
  } = user;

  const projectsToPreview = projects.slice(
    0,
    NUMBER_OF_PREVIEW_PROJECTS
  );

  const experienceRef = useRef();
  const experienceIntersectionObserver = useIntersectionObserver(
    experienceRef,
    {}
  );
  const isExperienceVisible =
    !!experienceIntersectionObserver?.isIntersecting;

  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <title>{name}</title>
        <meta
          name="description"
          content="Daniel Robertson, senior software engineer from Austin, Texas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* structured data consumed by search engines for seo juice */}
      <Script id="structured-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          alumniOf: "The University of Texas at Austin",
          jobTitle: "Software engineer",
          name: name,
          url: "https://www.danielrobertson.me",
          sameAs: [twitter, github, linkedin],
          image: image.fields.file.url,
          worksFor: {
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://www.leafly.com/"
          }
        })}
      </Script>

      <main id="top" className="text-gray-dark">
        <Header headshot={image.fields.file.url} user={user}></Header>

        <section className="mt-20 text-center ">
          <div className="container mx-auto">
            <h2 className="text-6xl">About</h2>
            <p className="mx-auto py-8 px-2 whitespace-pre-line font-light text-2xl md:max-w-4xl">
              {shortBio}
            </p>
          </div>
        </section>

        <section className="mt-20 p-5 px-10 pb-8 text-center bg-gray-light">
          <div className="container mx-auto mt-8">
            <h2 className="text-6xl">Projects</h2>
            <ul className="mt-8 mx-auto md:flex md:justify-center md:flex-wrap list-none max-w-4xl">
              {projectsToPreview.map(
                ({ name, thumbnail, id, githubUrl }) => (
                  <li
                    className="mt-10 lg:m-4 lg:max-w-sm hover:opacity-75"
                    key={name}
                  >
                    <Link href={githubUrl}>
                      <Image
                        className="w-full drop-shadow-xl rounded-lg"
                        src={`https:${thumbnail.fields.file.url}`}
                        alt={`${name} project thumbnail`}
                        width={Number(
                          thumbnail.fields.file.details.image.width
                        )}
                        height={Number(
                          thumbnail.fields.file.details.image.height
                        )}
                      />
                      <div className="text-3xl py-3">{name}</div>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>

        <section className="mt-20 text-center flex flex-col items-center text-gray-dark">
          <h2 className="text-6xl">Experience</h2>
          <div
            ref={experienceRef}
            className={classnames("mt-8 text-left")}
          >
            {experiences.map((experience, idx) => (
              <>
                <style jsx>
                  {`
                    .experience-delay {
                      transition-delay: ${idx * 150}ms;
                    }
                  `}
                </style>
                <div
                  className={classnames(
                    `flex mb-10 relative duration-700 experience-delay`,
                    {
                      "transition-none opacity-0":
                        !isExperienceVisible
                    },
                    {
                      "opacity-100 transition": isExperienceVisible
                    }
                  )}
                  key={experience.organization}
                >
                  <div className="ml-5">
                    <div className="text-2xl font-medium">
                      {experience.organization}
                    </div>
                    <div className="">{experience.role}</div>
                    <div className="font-medium text-sm">
                      {experience.tags.replace(/,/g, " • ")}
                    </div>
                  </div>
                  <div className="hidden md:block absolute border-2 w-4 h-4 -ml-2 border-gray-dark rounded-full"></div>
                  <div className="hidden md:block absolute h-[110%] top-[20px] -left-[0.5px] border-l border-gray-medium"></div>
                </div>
              </>
            ))}
          </div>

          <a
            className="flex justify-center p-5 mt-7"
            href={resumeUrl}
          >
            <p className="font-light underline text-lg underline-offset-1">
              Download Resume
            </p>
            <ExternalLink
              className="ml-1 mt-.5"
              aria-hidden="true"
              height="30"
              width="30"
            />
          </a>
        </section>

        <section className="mt-20 text-center bg-gray-light">
          <div className="container mx-auto">
            <h2 className="text-6xl pt-16">Contact</h2>
            <div className="mt-10 px-2 font-light text-2xl">
              I&apos;m open for hire, questions, or{" "}
              <a
                className="underline underline-offset-1"
                href="https://calendly.com/danielrobertson/coffee-chat"
              >
                coffee chats{" "}
              </a>{" "}
              ☕️ <br />
              Connect with me using the social media links below!
            </div>
          </div>
          <div className="mt-20 pb-10 text-center">
            <a
              href="#top"
              className="flex justify-center items-center"
            >
              <UpArrow aria-hidden="true" height="20" width="20" />
              <p className="ml-1 font-light underline">Back to top</p>
            </a>
          </div>
        </section>
      </main>

      <Footer user={user}></Footer>
    </div>
  );
};

export async function getStaticProps() {
  const [userResponse, projectsResponse, experiencesResponse] =
    await Promise.all([
      contentful.getEntry(process.env.USER_ID),
      contentful.getEntries({ content_type: "project" }),
      contentful.getEntries({ content_type: "experience" })
    ]);

  // TODO dynamically auto gen types from Contentful schema
  const projects = projectsResponse.items.map((p) => {
    return { ...p.fields, id: p.sys.id };
  });

  const experiences = experiencesResponse.items.map((p) => {
    return { ...p.fields, id: p.sys.id };
  });

  return {
    props: {
      user: userResponse.fields,
      projects,
      experiences
    }
  };
}

export default Home;

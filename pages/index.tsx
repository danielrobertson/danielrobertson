import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

import fetchProjects from "./api/fetchProjects";
import fetchUser from "./api/fetchUser";

import Twitter from "../components/icons/twitter.svg";
import Linkedin from "../components/icons/linkedin.svg";
import Instagram from "../components/icons/instagram.svg";
import Github from "../components/icons/github.svg";
import Soundcloud from "../components/icons/soundcloud.svg";
import Email from "../components/icons/email.svg";
import Bars from "../components/icons/bars.svg";
import UpArrow from "../components/icons/up-arrow.svg";
import ExternalLink from "../components/icons/external-link.svg";

const navigationLinks = Object.freeze([
  {
    label: "About",
    path: "#about"
  },
  {
    label: "Projects",
    path: "#projects"
  },
  {
    label: "Resume",
    path: "#resume"
  },
  {
    label: "Contact",
    path: "#contact"
  }
]);

const NUMBER_OF_PREVIEW_PROJECTS = 6;

export default function Home({ user, projects }) {
  const {
    aboutImage,
    github,
    image,
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

  // seo juice 🧃
  const googleStructuredData = {
    "@context": "http://schema.org",
    "@type": "Person",
    alumniOf: "The University of Texas at Austin",
    jobTitle: "Software engineer",
    name: "Daniel Robertson",
    url: "https://www.danielrobertson.me"
  };

  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          // percent is preferable to vh for mobile screens where vh is the max size, not current size
        }
      `}</style>
      <div className="flex flex-col min-h-full">
        <Head>
          <title>{name}</title>
          <meta
            name="description"
            content="Daniel Robertson, senior software engineer from Austin, Texas"
          />
          <link rel="icon" href="/favicon.ico" />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(googleStructuredData)
            }}
          />
        </Head>

        <main id="top">
          <header className="bg-blue-dark lg:pb-14">
            <div className="container relative mx-auto flex flex-col items-center text-gray-lightest">
              <div className="my-8 h-20 w-20 lg:h-52 lg:w-52 relative">
                <Image
                  className="rounded-full"
                  src={`https:${image.fields.file.url}`}
                  alt="daniel"
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>

              <button
                className="hidden absolute right-0 p-3 h-full"
                onClick={() => console.log("menu click")}
              >
                <Bars className="h-10 fill-gray-dark" />
                <span className="sr-only">Navigation menu</span>
              </button>

              <div className="hidden lg:block text-2xl">{title}</div>

              <nav className="hidden lg:block mt-8 text-5xl">
                <ol className="flex">
                  {navigationLinks.map((link) => (
                    <li
                      key={link.label}
                      className="mx-6 hover:text-gray-500"
                    >
                      <Link href={link.path}>
                        <a href={link.path}>{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="hidden lg:flex mt-10">
                {[
                  {
                    name: "twitter",
                    icon: (
                      <Twitter
                        aria-hidden="true"
                        height="30"
                        width="30"
                      />
                    )
                  },
                  {
                    name: "linkedin",
                    icon: (
                      <Linkedin
                        aria-hidden="true"
                        height="30"
                        width="30"
                      />
                    )
                  },
                  {
                    name: "instagram",
                    icon: (
                      <Instagram
                        aria-hidden="true"
                        height="30"
                        width="30"
                      />
                    )
                  },
                  {
                    name: "github",
                    icon: (
                      <Github
                        aria-hidden="true"
                        height="30"
                        width="30"
                      />
                    )
                  },
                  {
                    name: "soundcloud",
                    icon: (
                      <Soundcloud
                        aria-hidden="true"
                        height="30"
                        width="30"
                      />
                    )
                  },
                  {
                    name: "email",
                    icon: (
                      <Email
                        className=""
                        aria-hidden="true"
                        height="30"
                        width="30"
                      />
                    )
                  }
                ].map((social) => (
                  <Link key={social.name} href={user[social.name]}>
                    <a
                      className="mx-3 fill-white hover:fill-gray-500"
                      href={user[social.name]}
                    >
                      {social.icon}
                      <span className="sr-only">{social.name}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </header>

          <section className="mt-20 text-center text-gray-dark">
            <div className="container mx-auto">
              <h2 className="text-6xl">
                <a id="about" href="#about">
                  About
                </a>
              </h2>
              <p className="mx-auto p-8 whitespace-pre-line text-xl lg:max-w-3xl">
                {shortBio}
              </p>
            </div>
          </section>

          <section className="mt-20 p-5 pb-8 text-center text-gray-dark">
            <div className="container mx-auto">
              <h2 className="text-6xl">
                <a className="" id="projects" href="#projects">
                  Projects
                </a>
              </h2>
              <ul className="mt-8 lg:flex lg:justify-center lg:flex-wrap list-none">
                {projectsToPreview.map(
                  ({ name: projectName, thumbnail }) => (
                    <li
                      className="mt-10 lg:m-6 lg:max-w-md bg-white hover:opacity-75"
                      key={projectName}
                    >
                      <Link href={`/projects/${projectName}`}>
                        <a href={`/projects/${projectName}`}>
                          <Image
                            className="w-full rounded-md"
                            src={`https:${thumbnail.fields.file.url}`}
                            alt={`${projectName} project thumbnail`}
                            width={
                              thumbnail.fields.file.details.image
                                .width
                            }
                            height={
                              thumbnail.fields.file.details.image
                                .height
                            }
                          />
                          <div className="text-2xl py-3">
                            {projectName}
                          </div>
                        </a>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>

          <section className="mt-20 text-center text-gray-dark">
            <h2 className="text-6xl">
              <a id="resume" href="#resume">
                Resume
              </a>
            </h2>
            <a
              className="flex justify-center p-5 mt-5"
              href={resumeUrl}
            >
              <p className="underline text-lg underline-offset-1">
                Downloadable version
              </p>
              <ExternalLink
                className="ml-1 mt-.5"
                aria-hidden="true"
                height="30"
                width="30"
              />
            </a>
          </section>

          <section className="mt-20 text-center text-gray-dark">
            <div className="container mx-auto">
              <h2 className="text-6xl">
                <a id="contact" href="#contact">
                  Contact
                </a>
              </h2>
              <div className="mt-10">
                I&apos;m open for hire, questions, or{" "}
                <a href="https://calendly.com/danielrobertson/coffee-chat">
                  coffee chats ☕️
                </a>
                . Connect with me on{" "}
                <a
                  className="underline underline-offset-1"
                  href={twitter}
                >
                  Twitter
                </a>{" "}
                or{" "}
                <a
                  className="underline underline-offset-1"
                  href={linkedin}
                >
                  LinkedIn
                </a>
                !
              </div>
            </div>
          </section>
          <div className="my-20 text-center">
            <a
              href="#top"
              className="flex justify-center items-center"
            >
              <UpArrow aria-hidden="true" height="20" width="20" />
              <p className="ml-2">Back to Top</p>
            </a>
          </div>
        </main>

        <footer className="mt-auto text-center py-16 text-gray-lightest w-full bg-black">
          Made in Austin <span className="pr-0.5">🌎</span> by
          <a className="underline pl-1" href={twitter}>
            danielrobertson
          </a>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const [userResponse, projectsResponse] = await Promise.all([
    fetchUser(process.env.USER_ID),
    fetchProjects()
  ]);

  const projects = projectsResponse.items.map((p) => p.fields);
  console.log(
    "🚀 ~ file: index.js ~ line 51 ~ getStaticProps ~ projects",
    JSON.stringify(projects, null, 2)
  );
  console.log(
    "🚀 ~ file: index.js ~ line 49 ~ getStaticProps ~ userResponse",
    userResponse
  );

  return {
    props: {
      user: userResponse.fields,
      projects
    }
  };
}

const { array, shape, string } = PropTypes;
Home.propTypes = {
  user: shape({
    name: string,
    shortBio: string,
    email: string,
    twitter: string,
    github: string,
    image: shape({
      fields: shape({
        file: shape({
          title: string,
          url: string
        })
      })
    })
  }).isRequired,
  projects: array.isRequired
};

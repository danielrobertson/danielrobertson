import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import PropTypes from "prop-types";

import fetchProjects from "./api/fetchProjects";
import fetchUser from "./api/fetchUser";

import Twitter from "../components/icons/twitter.svg";
import Linkedin from "../components/icons/linkedin.svg";
import Instagram from "../components/icons/instagram.svg";
import Github from "../components/icons/github.svg";
import Soundcloud from "../components/icons/soundcloud.svg";
import UpArrow from "../components/icons/up-arrow.svg";
import ExternalLink from "../components/icons/external-link.svg";
import Header from "../components/Header";

const NUMBER_OF_PREVIEW_PROJECTS = 6;
export default function Home({ user, projects }) {
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

  const { url: headshot } = image.fields.file;

  const projectsToPreview = projects.slice(
    0,
    NUMBER_OF_PREVIEW_PROJECTS
  );

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
        </Head>
        <Script id="structured-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Person",
            alumniOf: "The University of Texas at Austin",
            jobTitle: "Software engineer",
            name: "Daniel Robertson",
            url: "https://www.danielrobertson.me",
            sameAs: [twitter, github, linkedin],
            image: headshot,
            worksFor: {
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://www.leafly.com/"
            }
          })}
        </Script>

        <main id="top">
          <Header title={title} headshot={headshot}></Header>

          <section className="mt-20 text-center text-gray-dark">
            <div className="container mx-auto">
              <h2 className="text-6xl">
                <a id="about" href="#about">
                  About
                </a>
              </h2>
              <p className="mx-auto p-8 whitespace-pre-line font-light text-xl lg:max-w-3xl">
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
                {projectsToPreview.map(({ name, thumbnail, id }) => (
                  <li
                    className="mt-10 lg:m-6 lg:max-w-md bg-white hover:opacity-75"
                    key={name}
                  >
                    <Link href={`/project/${id}`}>
                      <a href={`/project/${id}`}>
                        <Image
                          className="w-full rounded-md"
                          src={`https:${thumbnail.fields.file.url}`}
                          alt={`${name} project thumbnail`}
                          width={
                            thumbnail.fields.file.details.image.width
                          }
                          height={
                            thumbnail.fields.file.details.image.height
                          }
                        />
                        <div className="text-2xl py-3">{name}</div>
                      </a>
                    </Link>
                  </li>
                ))}
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
              <p className="font-light underline text-lg underline-offset-1">
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
              <div className="mt-10 px-2 font-light">
                I&apos;m open for hire, questions, or{" "}
                <a
                  className="underline underline-offset-1"
                  href="https://calendly.com/danielrobertson/coffee-chat"
                >
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
              <p className="ml-2 font-light">Back to Top</p>
            </a>
          </div>
        </main>

        <footer className="mt-auto text-center py-8 text-gray-lightest w-full bg-gray-darker">
          <div className="flex justify-center pt-3">
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
                  <Github aria-hidden="true" height="30" width="30" />
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
              }
            ].map((social) => (
              <Link key={social.name} href={user[social.name]}>
                <a
                  className="mx-3 fill-white hover:fill-gray-300"
                  href={user[social.name]}
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-sm">
            Made in Austin <span className="pr-0.5">🌎</span> by
            <a className="underline pl-1" href={twitter}>
              danielrobertson
            </a>
          </div>
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

  const projects = projectsResponse.items.map((p) => {
    return { ...p.fields, id: p.sys.id };
  });

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

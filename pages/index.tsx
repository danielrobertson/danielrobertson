import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

import fetchProjects from "./api/fetchProjects";
import fetchUser from "./api/fetchUser";
import UpArrow from "../components/icons/up-arrow.svg";
import ExternalLink from "../components/icons/external-link.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { User } from "../types/User";

const NUMBER_OF_PREVIEW_PROJECTS = 6;

type Props = {
  projects: any[];
  user: User;
};

const Home = ({ user, projects }: Props) => {
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
            name: name,
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
          <Header
            title={title}
            headshot={headshot}
            name={name}
          ></Header>

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

        <Footer user={user}></Footer>
      </div>
    </>
  );
};

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

export default Home;

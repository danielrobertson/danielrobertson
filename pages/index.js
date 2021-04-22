import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import fetchProjects from "./api/fetchProjects";
import fetchUser from "./api/fetchUser";
import Icon from "../components/Icon";

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

const socialLinks = Object.freeze([
  "twitter",
  "linkedin",
  "instagram",
  "github",
  "soundcloud",
  "email"
]);

const NUMBER_OF_PREVIEW_PROJECTS = 3;

export default function Home({ user, projects }) {
  const {
    github,
    image,
    linkedin,
    name,
    shortBio,
    title,
    twitter
  } = user;

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
        }
      `}</style>
      <div className="flex flex-col min-h-full">
        <Head>
          <title>{name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main id="top" className="">
          <header className="flex flex-col items-center bg-green text-gray-lightest pb-14">
            <img
              src={image.fields.file.url}
              className="rounded-full mt-16 h-52 w-52 text-xl"
              alt="headshot"
            />
            <div className="text-xl mt-4">{title}</div>

            <nav className="mt-8 text-5xl font-thin">
              <ol className="flex">
                {navigationLinks.map((link) => (
                  <li key={link.label} className="mx-6">
                    <Link href={link.path}>
                      <a href={link.path}>{link.label}</a>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 flex">
              {socialLinks.map((social) => (
                <Link key={social} href={user[social]}>
                  <a href={user[social]}>
                    <Icon name={social} className="mx-4" />
                  </a>
                </Link>
              ))}
            </div>
          </header>
          <section className="mt-20 text-center text-gray-dark">
            <a id="about" href="#about">
              <h2 className="text-6xl">About</h2>
            </a>
            <div className="px-16 mt-10">{shortBio}</div>
          </section>
          <section className="mt-20 text-center text-gray-dark">
            <a id="projects" href="#projects">
              <h2 className="text-6xl">Projects</h2>
            </a>
            <ul className="mt-10 text-xl list-none">
              {projectsToPreview.map(
                ({ name: projectName, images }) => {
                  const {
                    fields: { file: thumbnail }
                  } = images.find(
                    ({ fields }) => fields.title === "thumbnail"
                  );

                  return (
                    <li key={projectName}>
                      <div className="">{projectName}</div>
                      <img
                        src={thumbnail.url}
                        alt={`${projectName} thumbnail`}
                      />
                    </li>
                  );
                }
              )}
            </ul>
          </section>
          <section className="mt-20 text-center text-gray-dark">
            <a id="contact" href="#contact">
              <h2 className="text-6xl">Contact</h2>
            </a>
            <div className="mt-10">
              Let&apos;s connect on{" "}
              <a className="underline" href={twitter}>
                Twitter
              </a>{" "}
              or{" "}
              <a className="underline" href={linkedin}>
                LinkedIn
              </a>
              !
            </div>
          </section>
          <div className="my-20 text-gray-light text-center">
            <a href="#top">Back to Top</a>
          </div>
        </main>

        <footer className="mt-auto text-center py-16 text-gray-lightest w-full bg-blue-dark">
          Made in Austin 📍 by{" "}
          <a className="underline" href={`${github}/danielrobertson`}>
            danielrobertson
          </a>{" "}
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

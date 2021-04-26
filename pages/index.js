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
    aboutImage,
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
        }
      `}</style>
      <div className="flex flex-col min-h-full">
        <Head>
          <title>{name}</title>
          <link rel="icon" href="/favicon.ico" />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(googleStructuredData)
            }}
          />
        </Head>

        <main id="top" className="">
          <header className="bg-green pb-14">
            <div className="container mx-auto flex flex-col items-center text-gray-lightest">
              <img
                src={image.fields.file.url}
                className="rounded-full mt-16 h-52 w-52"
                alt="headshot"
              />
              <div className="text-xl mt-4">{title}</div>

              <nav className="mt-8 text-5xl font-thin">
                <ol className="flex">
                  {navigationLinks.map((link) => (
                    <li
                      key={link.label}
                      className="mx-6 hover:text-gray-600"
                    >
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
            </div>
          </header>

          <section className="mt-20 text-center text-gray-dark">
            <div className="container mx-auto">
              <a id="about" href="#about">
                <h2 className="text-6xl">About</h2>
              </a>
              <div className="flex px-16 mt-10">
                <p className="whitespace-pre-line text-xl flex items-center p-16 w-1/2">
                  {shortBio}
                </p>
                {/* TODO use Next/Image */}
                {/* TODO photo carousel, auto spin through them with slick cross fade */}
                <div className="relative mx-auto">
                  <img
                    className=""
                    style={{ maxHeight: "600px" }}
                    alt="daniel"
                    src={aboutImage.fields.file.url}
                  />
                  {/* Store this in Contentful */}
                  <div className="opacity-0 hover:opacity-75 absolute inset-0 flex justify-center flex-col items-center text-white text-xl bg-gray-900">
                    Bat Bar 6th Street 📍Austin, TX
                    <a
                      className="mt-8"
                      href="https://www.instagram.com/p/BsvfgQtFJeK/"
                    >
                      See the band videos{" "}
                      <span className="underline">here!</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-20 p-5 pb-8 text-center text-gray-dark">
            <div className="container mx-auto">
              <a className="" id="projects" href="#projects">
                <h2 className="text-6xl">Projects</h2>
              </a>
              <ul className="mt-10 list-none">
                {projectsToPreview.map(
                  ({ name: projectName, images }) => {
                    const {
                      fields: { file: thumbnail }
                    } = images.find(
                      ({ fields }) => fields.title === "thumbnail"
                    );

                    return (
                      <li
                        className="rounded-lg shadow-lg w-1/3 bg-white hover:opacity-75"
                        key={projectName}
                      >
                        <Link
                          className=""
                          href={`/projects/${projectName}`}
                        >
                          <a href={`/projects/${projectName}`}>
                            <img
                              className="w-full rounded-t-lg"
                              src={thumbnail.url}
                              alt={`${projectName} thumbnail`}
                            />
                            <figcaption className="text-2xl py-2">
                              {projectName}
                            </figcaption>
                          </a>
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </section>

          <section className="mt-20 text-center text-gray-dark">
            <div className="container mx-auto">
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

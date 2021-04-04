import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import fetchProjects from "./api/fetchProjects";
import fetchUser from "./api/fetchUser";
import Icon from "../components/Icon";

const socialLinks = Object.freeze([
  "twitter",
  "linkedin",
  "instagram",
  "github",
  "soundcloud",
  "email"
]);
export default function Home({ user, projects }) {
  const {
    email,
    github,
    image,
    name,
    shortBio,
    title,
    twitter
  } = user;

  console.log(
    "🚀 ~ file: index.js ~ line 6 ~ Home ~ projects",
    projects
  );
  console.log("🚀 ~ file: index.js ~ line 6 ~ Home ~ user", user);

  return (
    <div className="">
      <Head>
        <title>Daniel Robertson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <header className="flex flex-col items-center bg-green text-gray-lightest pb-24">
          <img
            src={image.fields.file.url}
            className="rounded-full mt-16 h-52 w-52 text-xl"
            alt="headshot"
          />
          <div className="text-xl mt-4">{user.title}</div>

          <div className="mt-10 flex">
            {socialLinks.map((social) => (
              <Link href={user[social]}>
                <a href={user[social]}>
                  <Icon name={social} className="mx-4" />
                </a>
              </Link>
            ))}
          </div>
        </header>
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold"> Projects</h2>
          <ul className="text-xl list-none">
            {projects.map((p) => (
              <li key={p.name}>{p.name}</li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="fixed bottom-5 text-center w-full">
        Made in Austin 🌍
      </footer>
    </div>
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
    projects
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

const { shape, string } = PropTypes;
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
  projects: shape({
    name: string,
    description: string,
    images: shape([
      shape({
        fields: shape({
          file: shape({
            title: string,
            url: string
          })
        })
      })
    ])
  }).isRequired
};

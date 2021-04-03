import Head from "next/head";
import PropTypes from "prop-types";
import fetchProjects from "./api/fetchProjects";
import fetchUser from "./api/fetchUser";

export default function Home({ user, projects }) {
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

      <main className="text-center">
        <h1 className="mt-10 text-xl">{user.name}</h1>

        <div className="">{user.shortBio}</div>
        <div className="mt-20">
          <h2 className="text-xl">Projects</h2>
          <ul>
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

import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import Image from "next/image";

import fetchProject from "../api/fetchProject";
import fetchUser from "../api/fetchUser";
import Header from "../../components/Header";
import Github from "../../components/icons/github.svg";

type Props = {
  project: any;
  user: any;
};

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Footer from "../../components/Footer";

const ProjectPage = ({ project, user }: Props) => {
  const { githubUrl, liveUrl, name } = project;

  return (
    <div className="flex flex-col flex-grow">
      <div>
        <Link href={`/`}>
          <a href={`/`}>
            <Header
              title={user.title}
              headshot={user.image.fields.file.url}
              name={user.name}
            ></Header>
          </a>
        </Link>
        <main className="text-center text-gray-dark pb-20">
          <h1 className="text-6xl p-3 mt-10">{name}</h1>
          <div className="px-5 mt-8">
            <div className="mx-auto">
              <Image
                className="w-full rounded-md"
                src={`https:${project.thumbnail.fields.file.url}`}
                alt={`${name} project thumbnail`}
                width={
                  project.thumbnail.fields.file.details.image.width
                }
                height={
                  project.thumbnail.fields.file.details.image.height
                }
              />
            </div>
            <p className="py-5 mx-auto lg:max-w-3xl">
              {documentToReactComponents(project.description)}
            </p>
          </div>
          {githubUrl && (
            <a
              href={githubUrl}
              className="inline-block button p-2 m-3 px-8 bg-black text-gray-lightest rounded-full cursor-pointer"
            >
              <Github
                className="inline mr-1.5 -mt-1 fill-gray-lightest"
                height="19"
                width="19"
              />
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              className="inline-block button p-2 m-3 px-8 bg-black text-gray-lightest rounded-full cursor-pointer"
            >
              🚀 Visit Site
            </a>
          )}
          <style jsx>{`
            .button {
              min-width: 180px;
            }
          `}</style>
        </main>
      </div>
      <Footer user={user} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  if (typeof query?.id !== "string") {
    return { props: {} };
  }

  try {
    const [userResponse, projectResponse] = await Promise.all([
      fetchUser(process.env.USER_ID),
      fetchProject(query.id)
    ]);

    return {
      props: {
        project: projectResponse.fields,
        user: userResponse.fields
      }
    };
  } catch (err) {
    console.error(err);
    return {
      props: {}
    };
  }
};
export default ProjectPage;

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import fetchProject from "../api/fetchProject";

type Props = {
  project: any;
};

const ProjectPage = ({ project }: Props) => {
  return <div>{project.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  if (typeof query?.id !== "string") {
    return { props: {} };
  }

  try {
    const projectResponse = await fetchProject(query.id);
    return {
      props: {
        project: projectResponse.fields
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

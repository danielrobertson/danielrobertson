import client from "../../lib/contentful";

const fetchProjects = () =>
  client.getEntries({ content_type: "project" });

export default fetchProjects;

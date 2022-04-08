import client from "../../lib/contentful";

const fetchProject = (id: string) => client.getEntry(id);

export default fetchProject;

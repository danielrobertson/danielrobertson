import client from "../../lib/contentful";

export default () => client.getEntries({ content_type: "project" });

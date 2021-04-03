import client from "../../lib/contentful";

export default (userId) => client.getEntry(userId);

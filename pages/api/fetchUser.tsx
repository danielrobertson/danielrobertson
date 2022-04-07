import client from "../../lib/contentful";

const fetchUser = (userId) => client.getEntry(userId);

export default fetchUser;

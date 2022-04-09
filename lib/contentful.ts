const contentful = require("contentful");

export default contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// const contentful = require("contentful-management");

// const client = contentful.createClient(
//   {
//     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
//   },
//   {
//     type: "plain",
//     defaults: {
//       spaceId: process.env.CONTENTFUL_SPACE_ID,
//       environmentId: "master"
//     }
//   }
// );
// console.log("🚀 ~ file: contentful.ts ~ line 22 ~ client", client);

// export default client;

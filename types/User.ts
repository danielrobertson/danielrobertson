// TODO dynamically auto gen types using Contentful SDK if possible
export type User = {
  github: string;
  image: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  linkedin: string;
  name: string;
  resumeUrl: string;
  shortBio: string;
  title: string;
  twitter: string;
};

import { Document } from "@contentful/rich-text-types";

// TODO dynamically auto gen types from Contentful schema
export type Project = {
  id: string;
  name: string;
  description: Document; // let @contentful/rich-text-react-renderer deal with this
  githubUrl: string;
  liveUrl: string;
  thumbnail: {
    metadata: any;
    sys: any;
    fields: {
      title: string;
      description: "";
      file: {
        url: string;
        details: {
          image: {
            width: string; // px
            height: string;
          };
        };
      };
    };
  };
  created: string;
};

// TODO dynamically auto gen types using Contentful SDK if possible
export type Experience = {
  organization: string;
  role: string;
  dateRange: string;
  image: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  tags: string;
  id: string;
};

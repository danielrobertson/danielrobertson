import contentful from "contentful";
import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

interface TypeExperienceFields {
  organization?: EntryFieldTypes.Symbol;
  role?: EntryFieldTypes.Symbol;
  dateRange?: EntryFieldTypes.Symbol;
  image?: EntryFieldTypes.AssetLink;
  tags?: EntryFieldTypes.Symbol;
}

export type Experience = EntrySkeletonType<TypeExperienceFields, "experience">;

interface TypePersonFields {
  name: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  company: EntryFieldTypes.Symbol;
  shortBio: EntryFieldTypes.Text;
  email?: EntryFieldTypes.Symbol;
  phone?: EntryFieldTypes.Symbol;
  twitter?: EntryFieldTypes.Symbol;
  github?: EntryFieldTypes.Symbol;
  image?: EntryFieldTypes.AssetLink;
  soundcloud?: EntryFieldTypes.Symbol;
  linkedin?: EntryFieldTypes.Symbol;
  instagram?: EntryFieldTypes.Symbol;
  aboutImage?: EntryFieldTypes.AssetLink;
  resumeUrl?: EntryFieldTypes.Symbol;
  longBio?: EntryFieldTypes.Text;
}

export type Person = EntrySkeletonType<TypePersonFields, "person">;

interface TypeProjectFields {
  name?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  githubUrl?: EntryFieldTypes.Symbol;
  liveUrl?: EntryFieldTypes.Symbol;
  thumbnail?: EntryFieldTypes.AssetLink;
  created?: EntryFieldTypes.Date;
}

export type Project = EntrySkeletonType<TypeProjectFields, "project">;

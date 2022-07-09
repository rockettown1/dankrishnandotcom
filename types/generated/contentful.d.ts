// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IBlogPostFields {
  /** title */
  title?: string | undefined;

  /** slug */
  slug?: string | undefined;

  /** published date */
  publishedDate?: string | undefined;

  /** body */
  body?: Document | undefined;

  /** hero image */
  heroImage?: Asset | undefined;
}

export interface IBlogPost extends Entry<IBlogPostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "blogPost";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICodeBlockFields {
  /** id */
  id: string;

  /** code */
  code: string;
}

export interface ICodeBlock extends Entry<ICodeBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "codeBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IMocksFields {
  /** desktop */
  desktop?: Asset | undefined;

  /** mobile */
  mobile?: Asset | undefined;

  /** id */
  id: string;
}

/** Takes a desktop screenshot and a mobile screenshot */

export interface IMocks extends Entry<IMocksFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "mocks";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPostFields {
  /** title */
  title?: string | undefined;

  /** excerpt */
  excerpt?: string | undefined;

  /** date */
  date?: string | undefined;

  /** featured image */
  featuredImage?: Asset | undefined;

  /** body */
  body?: Document | undefined;

  /** slug */
  slug?: string | undefined;

  /** tag_id */
  tagId: string[];
}

export interface IPost extends Entry<IPostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "post";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IProjectFields {
  /** name */
  name: string;

  /** slug */
  slug: string;

  /** headline */
  headline: string;

  /** description */
  description: string;

  /** featured Image */
  featuredImage: Asset;

  /** background color? */
  backgroundColor?: string | undefined;

  /** tech */
  tech: Record<string, any>;

  /** type */
  type: "fullstack" | "frontend" | "design" | "tooling" | "random";

  /** Body */
  body?: Document | undefined;

  /** textblock */
  textblock?: Entry<{ [fieldId: string]: unknown }>[] | undefined;

  /** link */
  link?: string | undefined;

  /** github */
  github?: string | undefined;
}

/** Portfolio Project */

export interface IProject extends Entry<IProjectFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "project";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITechListFields {
  /** tech */
  tech?: Asset[] | undefined;

  /** name */
  name: string;
}

/** List of technologies (logos) */

export interface ITechList extends Entry<ITechListFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "techList";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITextBlockWithTitleFields {
  /** heading */
  heading?: string | undefined;

  /** paragraph */
  paragraph?: string | undefined;

  /** name */
  name: string;

  /** type */
  type: "mainText" | "subText" | "secondaryText";

  /** rich paragraph */
  richParagraph?: Document | undefined;
}

/** A title and a text block which will be rendered side by side */

export interface ITextBlockWithTitle extends Entry<ITextBlockWithTitleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "textBlockWithTitle";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IVideoWithOptionsFields {
  /** name */
  name: string;

  /** video */
  video: Asset;

  /** poster */
  poster?: Asset | undefined;

  /** autoplay */
  autoplay: boolean;
}

export interface IVideoWithOptions extends Entry<IVideoWithOptionsFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "videoWithOptions";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IVideoWithPosterFields {
  /** Video */
  video: Asset;

  /** Poster */
  poster: Asset;

  /** name */
  name?: string | undefined;
}

/** When using Videos requiring poster images */

export interface IVideoWithPoster extends Entry<IVideoWithPosterFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "videoWithPoster";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "blogPost"
  | "codeBlock"
  | "mocks"
  | "post"
  | "project"
  | "techList"
  | "textBlockWithTitle"
  | "videoWithOptions"
  | "videoWithPoster";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";

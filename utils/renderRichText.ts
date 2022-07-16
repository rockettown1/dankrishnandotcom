import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "./richTextOptions";
import { Document } from "@contentful/rich-text-types";

export default (body: Document) => {
  return documentToReactComponents(body, richTextOptions);
};

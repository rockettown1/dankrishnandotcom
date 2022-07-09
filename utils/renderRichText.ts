import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "./richTextOptions";

export default (body: any) => {
  return documentToReactComponents(body, richTextOptions);
};

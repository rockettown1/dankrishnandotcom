import { ITechList } from "types/generated/contentful";
import { Asset } from "contentful";

export const sortTech = (techList: ITechList) => {
  const sortedTech: Asset[][] = new Array(6).fill(0).map(() => []);
  techList.fields.tech!.forEach((tech) => {
    sortedTech[parseInt(tech.metadata.tags[0].sys.id.split("h")[1])].push(tech);
  });
  return sortedTech;
};

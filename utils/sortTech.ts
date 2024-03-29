import { ITechList, ITechListFields } from "types/generated/contentful";
import { Asset } from "contentful";

/**
 *
 * @param techList
 * @returns Array of technologies sorted by tag (most used to least)
 */
export const sortTech = (techList: ITechListFields) => {
  const sortedTech: Asset[][] = new Array(6).fill(0).map(() => []);

  techList.tech!.forEach((tech) => {
    sortedTech[parseInt(tech.metadata.tags[0].sys.id.split("h")[1])].push(tech);
  });
  return sortedTech;
};

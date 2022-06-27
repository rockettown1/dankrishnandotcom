export type TechList = {
  fields: {
    tech: Tech[];
  };
};

type Tech = {
  fields: {
    title: string;
    description: string;
    file: { url: string };
  };
  metadata: {
    tags: [{ sys: { id: string } }];
  };
};

export const sortTech = (techList: TechList) => {
  const sortedTech: Tech[][] = new Array(6).fill(0).map(() => []);
  techList.fields.tech.forEach((tech) => {
    sortedTech[tech.metadata.tags[0].sys.id.split("h")[1]].push(tech);
  });
  return sortedTech;
};

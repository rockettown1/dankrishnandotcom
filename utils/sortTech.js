export const sortTech = (techList) => {
  const sortedTech = new Array(6).fill().map(() => []);
  techList.fields.tech.forEach((tech) => {
    sortedTech[tech.metadata.tags[0].sys.id.split("h")[1]].push(tech);
  });
};

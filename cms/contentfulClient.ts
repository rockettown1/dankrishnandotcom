import { createClient } from "contentful";

const space: string = process.env.CONTENTFUL_SPACE!;
const accessToken: string = process.env.CONTENTFUL_ACCESS_TOKEN!;

//Contentful Access
export default createClient({
  space,
  accessToken,
});

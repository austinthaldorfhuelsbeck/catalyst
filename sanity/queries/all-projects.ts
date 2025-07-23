import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const allProjectsQuery = groq`
  _type == "all-projects" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
  }
`;

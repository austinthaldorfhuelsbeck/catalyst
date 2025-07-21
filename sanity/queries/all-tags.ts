import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const allTagsQuery = groq`
  _type == "all-tags" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
  }
`;

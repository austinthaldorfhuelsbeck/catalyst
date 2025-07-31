import { groq } from 'next-sanity';
import { imageQuery } from './image';

export const previewCardQuery = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  image{
    ${imageQuery}
  },
  tags[]->{
    _id,
    title,
    slug,
    color
  }
`;

// Query to generate types for PreviewCard props
export const PREVIEW_CARD_QUERY = groq`*[_type == "post"][0]{
  ${previewCardQuery}
}`;

import { groq } from 'next-sanity';
import { previewCardQuery } from './shared/preview-card';

// @sanity-typegen-ignore
export const featuredPostQuery = groq`
  _type == "featured-post" => {
    _type,
    _key,
    post->{
      ${previewCardQuery}
    },
    padding,
    sectionWidth,
    _createdAt,
    _updatedAt,
  }
`;

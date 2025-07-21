import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';
import { bodyQuery } from './shared/body';

export const TAG_QUERY = groq`*[_type == "tag" && slug.current == $slug][0]{
    title,
    slug,
    color,
    body[]{
      ${bodyQuery}
    },
    meta_title,
    meta_description,
    noindex,
    ogImage{
      ${imageQuery}
    },
  }
`;

export const TAGS_QUERY = groq`*[_type == "tag" && defined(slug)]{
  title,
  slug,
  color,
}`;

export const TAGS_SLUGS_QUERY = groq`*[_type == "tag" && defined(slug)]{slug}`;

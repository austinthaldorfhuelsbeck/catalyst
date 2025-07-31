import { groq } from 'next-sanity';
import { bodyQuery } from './shared/body';
import { imageQuery } from './shared/image';

export const EVENT_CATEGORY_QUERY = groq`*[_type == "event-category" && slug.current == $slug][0]{
  _id,
  _key,
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
  orderRank,
  "events": *[_type == "event" && references(^._id)]{
    _id,
    _type,
    title,
    slug,
    date,
    location,
    category->{
      title,
      slug,
      color,
    },
    image{
      ${imageQuery}
    },
    excerpt,
    body[]{
      ${bodyQuery}
    },
    tags[]->{
      _id,
      title,
      slug,
      color,
    },
  },
}`;

export const EVENT_CATEGORIES_QUERY = groq`*[_type == "event-category" && defined(slug)] | order(orderRank asc){
  _id,
  _key,
  title,
  slug,
  color,
  _createdAt,
  _updatedAt
}`;

export const EVENT_CATEGORIES_SLUGS_QUERY = groq`*[_type == "event-category" && defined(slug)]{slug}`;

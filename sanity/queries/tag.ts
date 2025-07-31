import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';
import { bodyQuery } from './shared/body';

export const TAG_QUERY = groq`*[_type == "tag" && slug.current == $slug][0]{
    _id,
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
    "posts": *[_type == "post" && references(^._id)]{
      _id,
      _type,
      title,
      slug,
      excerpt,
      author->{
        name,
        slug
      },
      image{
        ${imageQuery}
      },
      tags[]->{
        _id,
        title,
        slug,
        color
      }
    },
    "projects": *[_type == "project" && references(^._id)]{
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
    },
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
      tags[]->{
        _id,
        title,
        slug,
        color
      }
    },
  }
`;

export const TAGS_QUERY = groq`*[_type == "tag" && defined(slug)]{
  _id,
  title,
  slug,
  color,
}`;

export const TAGS_SLUGS_QUERY = groq`*[_type == "tag" && defined(slug)]{slug}`;

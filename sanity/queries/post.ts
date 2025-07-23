import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';
import { bodyQuery } from './shared/body';

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    image{
      ${imageQuery}
    },
    body[]{
      ${bodyQuery}
    },
    excerpt,
    author->{
      name,
      image {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    tags[]->{
      _id,
      title,
      slug,
      color,
    },
    _createdAt,
    _updatedAt,
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)] | order(_createdAt desc){
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
      color,
    },
}`;

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug)]{slug}`;

import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';
import { bodyQuery } from './shared/body';

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    excerpt,
    url,
    repo,
    image{
      ${imageQuery}
    },
    tags[]->{
      _id,
      title,
      slug,
      color,
    },
    problem[]{
      ${bodyQuery}
    },
    solution[]{
      ${bodyQuery}
    },
    gallery[]{
      ${imageQuery}
    },
    implementation[]{
      ${bodyQuery}
    },
    results[]{
      ${bodyQuery}
    },
    testimonials[]->{
      _id,
      name,
      title,
      image{
        ${imageQuery}
      },
      body[]{
        ${bodyQuery}
      },
      rating,
      orderRank,
    },
    meta_title,
    meta_description,
    noindex,
    ogImage{
      ${imageQuery}
    }
}`;

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)] | order(_createdAt desc){
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
      color,
    },
}`;

export const PROJECTS_SLUGS_QUERY = groq`*[_type == "project" && defined(slug)]{slug}`;

import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';
import { bodyQuery } from './shared/body';

export const EVENT_QUERY = groq`*[_type == "event" && slug.current == $slug][0]{
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
  sellTickets,
  ticketPrice,
  saleEndDate,
  maxTickets,
  discountCodes[]->{
    code,
    discountAmount,
  },
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

export const EVENTS_QUERY = groq`*[_type == "event" && defined(slug)] | order(_createdAt desc){
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
  link,
  image{
    ${imageQuery}
  },
  excerpt,
  tags[]->{
    _id,
    title,
    slug,
    color,
  }
}`;

export const EVENTS_SLUGS_QUERY = groq`*[_type == "event" && defined(slug)]{slug}`;

import { SanityDocument } from 'next-sanity';
import type { Slug, Color } from '@/sanity.types';

declare global {
  namespace Sanity {
    // documents
    type DocumentBase = SanityDocument<{
      _id: string;
      _type: 'page' | 'post' | 'author' | 'tag' | 'faq' | 'testimonial' | 'navigation' | 'settings';
      title: string | null;
      slug: Slug | null;
    }>;
    type Tag = DocumentBase & {
      readonly _type: 'tag';
      color: Color | null;
    };
  }
}

import { defineField } from 'sanity';

export const metaFields = [
  defineField({
    name: 'meta_title',
    title: 'Meta Title',
    type: 'string',
    group: 'meta',
  }),
  defineField({
    name: 'meta_description',
    title: 'Meta Description',
    type: 'text',
    group: 'meta',
  }),
  defineField({
    name: 'noindex',
    title: 'No Index',
    type: 'boolean',
    initialValue: false,
    group: 'meta',
  }),
  defineField({
    name: 'ogImage',
    title: 'Open Graph Image - [1200x630]',
    type: 'image',
    group: 'meta',
  }),
];

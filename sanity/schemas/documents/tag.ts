import { defineField, defineType } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';
import { Tag } from 'lucide-react';

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'body',
      type: 'block-content',
    }),
    orderRankField({ type: 'tag' }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
});

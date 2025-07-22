import { defineField, defineType } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';
import { Tag } from 'lucide-react';
import { metaFields } from '../blocks/shared/meta-fields';

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: Tag,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'meta',
      title: 'Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The display name of the tag',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The slug of the tag',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      description: 'The color the tag badge displays as',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'settings',
    }),
    defineField({
      name: 'body',
      type: 'block-content',
      description: 'Additional body text of the tag for the details page',
      group: 'content',
    }),
    ...metaFields,
    orderRankField({ type: 'tag' }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
});

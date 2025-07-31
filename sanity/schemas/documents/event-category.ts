import { defineField, defineType } from 'sanity';
import { DatabaseIcon } from '@sanity/icons';
import { orderRankField } from '@sanity/orderable-document-list';
import { metaFields } from '../blocks/shared/meta-fields';

export default defineType({
  name: 'event-category',
  title: 'Event Category',
  type: 'document',
  icon: DatabaseIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'meta',
      title: 'Metadata',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'block-content',
      description: 'Used for the hero section on the category overview page',
      group: 'content',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      group: 'settings',
      validation: (rule) => rule.required(),
      options: {
        disableAlpha: true,
      },
    }),
    ...metaFields,
    orderRankField({ type: 'event-category' }),
  ],
});

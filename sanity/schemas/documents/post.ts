import { defineField, defineType } from 'sanity';
import { FileText } from 'lucide-react';
import { metaFields } from '../blocks/shared/meta-fields';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: FileText,
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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'settings',
      to: { type: 'author' },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'settings',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'tags',
      type: 'array',
      group: 'settings',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'block-content',
      group: 'content',
    }),
    ...metaFields,
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});

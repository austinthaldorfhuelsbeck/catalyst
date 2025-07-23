import { defineField, defineType } from 'sanity';
import { FileCode } from 'lucide-react';
import { metaFields } from '@/sanity/schemas/blocks/shared/meta-fields';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FileCode,
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'repo',
      title: 'GitHub Repo',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
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
    // defineField({
    //   name: 'skills',
    //   title: 'Skills',
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'skill' } }],
    //   group: 'settings',
    // }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      group: 'settings',
    }),
    defineField({
      name: 'problem',
      title: 'Problem Statement',
      type: 'block-content',
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'Solution Approach',
      type: 'block-content',
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
      group: 'content',
    }),
    defineField({
      name: 'implementation',
      title: 'Implementation Details',
      type: 'block-content',
      group: 'content',
    }),
    defineField({
      name: 'results',
      title: 'Results and Outcomes',
      type: 'block-content',
      group: 'content',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      group: 'settings',
    }),
    ...metaFields,
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      return selection;
    },
  },
});

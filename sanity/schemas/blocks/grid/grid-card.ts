import { defineField, defineType } from 'sanity';
import { LayoutGrid } from 'lucide-react';

export default defineType({
  name: 'grid-card',
  title: 'Grid Card',
  type: 'object',
  icon: LayoutGrid,
  description: 'A card for a grid',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
    }),
    defineField({
      name: 'image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: 'Grid Card',
        subtitle: title || 'No title',
        media,
      };
    },
  },
});

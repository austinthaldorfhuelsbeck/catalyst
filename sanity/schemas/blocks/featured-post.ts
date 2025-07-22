import { defineField, defineType } from 'sanity';

import { stylingFields } from './shared/styling-fields';
import { PenTool } from 'lucide-react';

export default defineType({
  name: 'featured-post',
  title: 'Featured Post',
  type: 'object',
  icon: PenTool,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
  fields: [
    ...stylingFields,
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'post.title',
    },
    prepare({ title }) {
      return {
        title: 'Featured Post',
        subtitle: title || 'No Title',
      };
    },
  },
});

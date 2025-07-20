import { defineType, defineField } from 'sanity';
import { ArrowDownNarrowWide } from 'lucide-react';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'timeline-row',
  type: 'object',
  title: 'Timeline Row',
  icon: ArrowDownNarrowWide,
  description: 'Row of Timeline Sections',
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
      name: 'timelines',
      type: 'array',
      of: [{ type: 'timelines-1' }],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (block) => `/sanity/preview/${block}.jpg`,
            },
            { name: 'list' },
          ],
        },
      },
      group: 'content',
    }),
  ],
  preview: {
    select: {
      subtitle: 'timelines.0.title',
    },
    prepare({ subtitle }) {
      return {
        title: 'Timelines Row',
        subtitle,
      };
    },
  },
});

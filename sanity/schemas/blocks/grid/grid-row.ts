import { defineField, defineType } from 'sanity';
import { LayoutGrid } from 'lucide-react';
import { COLS_VARIANTS } from '../shared/layout-variants';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'grid-row',
  title: 'Grid Row',
  type: 'object',
  icon: LayoutGrid,
  description: 'A grid row for displaying cards, posts, and pricing cards',
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
      name: 'gridColumns',
      type: 'string',
      title: 'Grid Columns',
      options: {
        list: COLS_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'grid-cols-3',
      description: 'Choose the number of columns in the grid',
      group: 'styling',
    }),
    defineField({
      name: 'columns',
      type: 'array',
      of: [{ type: 'grid-card' }, { type: 'grid-post' }, { type: 'pricing-card' }],
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
      description: 'Add cards to the grid',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'columns.0.title',
      postTitle: 'columns.0.post.title',
    },
    prepare({ title, postTitle }) {
      return {
        title: 'Grid Row',
        subtitle: title || postTitle,
      };
    },
  },
});

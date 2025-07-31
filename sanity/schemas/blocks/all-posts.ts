import { defineType } from 'sanity';
import { Newspaper } from 'lucide-react';
import { stylingFields } from './shared/styling-fields';

export default defineType({
  name: 'all-posts',
  type: 'object',
  title: 'All Posts',
  description: 'A list of all posts',
  icon: Newspaper,
  groups: [{ name: 'styling', title: 'Styling' }],
  fields: stylingFields,
  preview: {
    prepare() {
      return {
        title: 'All Posts',
      };
    },
  },
});

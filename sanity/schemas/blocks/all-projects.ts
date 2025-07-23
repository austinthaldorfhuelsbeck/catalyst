import { defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';
import { stylingFields } from './shared/styling-fields';

export default defineType({
  name: 'all-projects',
  type: 'object',
  title: 'All Projects',
  description: 'A list of all projects',
  icon: Newspaper,
  groups: [{ name: 'styling', title: 'Styling' }],
  fields: stylingFields,
  preview: {
    prepare() {
      return {
        title: 'All Projects',
      };
    },
  },
});

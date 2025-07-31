import { defineType } from 'sanity';
import { Newspaper } from 'lucide-react';
import { stylingFields } from './shared/styling-fields';

export default defineType({
  name: 'all-events',
  type: 'object',
  title: 'All Events',
  description: 'A list of all events',
  icon: Newspaper,
  groups: [{ name: 'styling', title: 'Styling' }],
  fields: stylingFields,
  preview: {
    prepare() {
      return {
        title: 'All Events',
      };
    },
  },
});

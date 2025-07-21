import { defineType } from 'sanity';
import { Tags } from 'lucide-react';
import { stylingFields } from './shared/styling-fields';

export default defineType({
  name: 'all-tags',
  type: 'object',
  title: 'All Tags',
  description: 'A list of all tags',
  icon: Tags,
  groups: [{ name: 'styling', title: 'Styling' }],
  fields: stylingFields,
  preview: {
    prepare() {
      return { title: 'All Tags' };
    },
  },
});

import { defineField, defineType } from 'sanity';
import { Menu } from 'lucide-react';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: Menu,
  fields: [
    defineField({
      name: 'navItems',
      title: 'Navigation items',
      type: 'array',
      of: [{ type: 'nav-item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' };
    },
  },
});

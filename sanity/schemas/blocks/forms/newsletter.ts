import { defineField, defineType } from 'sanity';
import { Mails } from 'lucide-react';
import { STACK_ALIGN } from '../shared/layout-variants';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'form-newsletter',
  type: 'object',
  title: 'Form: Newsletter',
  icon: Mails,
  description:
    'A subscription form ideal for collecting email addresses for newsletters and waitlists.',
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
      name: 'consentText',
      type: 'text',
      initialValue:
        'By subscribing, you agree to receive emails from us. You can unsubscribe at any time.',
      description: 'Text to display in the consent checkbox',
      group: 'content',
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      initialValue: 'Subscribe',
      description: 'Text to display on the submit button',
      group: 'content',
    }),
    defineField({
      name: 'successMessage',
      type: 'text',
      initialValue: 'Thank you for subscribing!',
      description: 'Text to display after a successful submission',
      group: 'content',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Newsletter Form',
      };
    },
  },
});

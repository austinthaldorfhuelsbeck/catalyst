import { defineField, defineType } from 'sanity';
import { Text } from 'lucide-react';
import { stylingFields } from '@/sanity/schemas/blocks/shared/styling-fields';

export default defineType({
  name: 'form-contact',
  title: 'Contact Form',
  type: 'object',
  icon: Text,
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
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Field',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              description: 'What the field will be called when submitted and emailed to you',
            },
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder text',
              description: 'What the field will be prefilled with',
            },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'phone' },
                  { title: 'Message', value: 'message' },
                ],
                layout: 'radio',
              },
              initialValue: 'text',
            },
            {
              name: 'required',
              type: 'boolean',
              title: 'Required',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (rule) => rule.min(1),
      group: 'content',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      group: 'content',
    }),
    ...stylingFields,
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
      };
    },
  },
});

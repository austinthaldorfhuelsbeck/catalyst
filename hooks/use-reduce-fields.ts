import { z } from 'zod';

export default function useReduceFields(
  fields?: Array<{
    name?: string | null;
    type?: string | null;
    required?: boolean | null;
  }>,
) {
  return (
    fields?.reduce<{ [key: string]: z.ZodTypeAny }>((acc, field) => {
      if (!field.name) return acc;

      // Creates type-specific validation
      const getTypeValidation = (type: string | undefined) => {
        switch (type) {
          case 'email':
            return z.string().email('Invalid email address');
          case 'phone':
            return z.string().regex(/^\+?[0-9]{6,}$/, 'Invalid phone number');
          case 'message':
          case 'text':
          default:
            return z.string();
        }
      };

      if (field.required) {
        // Required fields: Always apply validation
        acc[field.name] = getTypeValidation(field.type!).min(1, 'This field is required');
      } else {
        // Optional fields: Only apply type validation if the field has content
        acc[field.name] = z
          .union([z.string().length(0), getTypeValidation(field.type!)])
          .optional();
      }

      return acc;
    }, {}) || {}
  );
}

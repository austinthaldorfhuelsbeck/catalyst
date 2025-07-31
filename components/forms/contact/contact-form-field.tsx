'use client';

import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Control, ControllerRenderProps, FieldErrors } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { PAGE_QUERYResult } from '@/sanity.types';

type ContactForm = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'form-contact' }
>;
type ContactFormFieldProps = NonNullable<ContactForm['fields']>[number] & {
  control: Control;
  errors: FieldErrors;
  className?: string;
};

export default function ContactFormField({
  name,
  placeholder,
  type,
  control,
  errors,
  className,
}: ContactFormFieldProps) {
  if (!name) return null;

  const renderField = (fieldType: string, field: ControllerRenderProps) => {
    const commonProps = {
      ...field,
      placeholder: placeholder || '',
      className: 'w-full',
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    };

    switch (fieldType) {
      case 'message':
        return <Textarea {...commonProps} rows={4} />;
      case 'email':
        return <Input {...commonProps} type="email" />;
      case 'phone':
        return <Input {...commonProps} type="tel" />;
      case 'text':
      default:
        return <Input {...commonProps} type="text" />;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>{renderField(type || 'text', field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

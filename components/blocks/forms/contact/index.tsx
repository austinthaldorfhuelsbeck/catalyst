'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionContainer from '@/components/ui/section-container';

import useReduceFields from '@/hooks/use-reduce-fields';
import { PAGE_QUERYResult } from '@/sanity.types';
import FormContactField from './contact-form-field';

type FormContactProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'form-contact' }
>;

export default function FormContact({
  padding,
  colorVariant,
  fields,
  submitButtonText,
}: FormContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const reducedFields = useReduceFields(fields!);
  const formSchema = z.object(reducedFields);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: fields?.reduce(
      (acc, field) => {
        if (field.name) {
          acc[field.name] = '';
        }
        return acc;
      },
      {} as { [key: string]: string },
    ),
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SectionContainer color={colorVariant} padding={padding} className="px-10">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {submitStatus === 'success' && (
            <div className="md:col-span-2">
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Thank you for your message! I&apos;ll get back to you soon.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="md:col-span-2">
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}

          {fields?.map((field) => (
            <FormContactField
              key={field.name}
              {...field}
              control={form.control}
              errors={form.formState.errors}
              className={field.type === 'message' ? 'md:col-span-2' : undefined}
            />
          ))}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </SectionContainer>
  );
}

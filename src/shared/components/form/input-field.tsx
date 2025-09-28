'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { cn } from '@/shared/lib/utils';

export interface InputFieldProps extends React.ComponentProps<'input'> {
  name: string;
  label?: string;
  description?: string;
}

const InputField = ({
  name,
  label,
  description,
  className,
  ...rest
}: InputFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label ? <FormLabel>{label}</FormLabel> : null}

          <FormControl>
            <Input {...rest} {...field} />
          </FormControl>

          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;

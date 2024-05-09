import clsx from 'clsx';
import get from 'lodash.get';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Typography from '@/_components/shared/Typography';

export type TextAreaProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  rows?: number;
  boxClassNames?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  rows = 3,
  boxClassNames,
  ...rest
}: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div className={boxClassNames}>
      <Typography as='label' variant='s3' className='block' htmlFor={id}>
        {label}
      </Typography>
      <div className='relative mt-1'>
        <textarea
          {...register(id, validation)}
          rows={rows}
          {...rest}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsx(
            'block min-h-[40px] w-full rounded-lg shadow-sm',
            'focus:border-primary-500 focus:ring-primary-500 border-gray-300',
            (readOnly || disabled) &&
              'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
      </div>
      {!(!hideError && error) && helperText && (
        <Typography variant='c1' color='secondary' className='mt-1'>
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant='c1' color='danger' className='mt-1'>
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}

import clsx from 'clsx';
import get from 'lodash.get';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar, HiOutlineXCircle } from 'react-icons/hi';

import 'react-datepicker/dist/react-datepicker.css';

import IconButton from '@/_components/shared/buttons/IconButton';
import Typography from '@/_components/shared/Typography';
type DatePickerProps = {
  validation?: RegisterOptions;
  label: string | null;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
} & Omit<ReactDatePickerProps, 'onChange'>;

export default function DatePicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  ...rest
}: DatePickerProps) {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const error = get(errors, id);

  const withLabel = label !== null;

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className='relative'>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className='relative mt-1'>
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                selected={value ? new Date(value) : undefined}
                wrapperClassName='w-full'
                className={clsx(
                  'flex w-full rounded-lg shadow-sm',
                  'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                  'focus:border-primary-500 focus:ring-primary-500 border-gray-300',
                  (readOnly || disabled) &&
                    'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                  error &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500'
                )}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat='dd/MM/yyyy'
                readOnly={readOnly}
                disabled={disabled}
                // This is a workaround to fix the z-index issue
                portalId='datepicker-portal'
                {...rest}
              />
              {value ? (
                <IconButton
                  variant='ghost'
                  onClick={() => setValue(id, undefined)}
                  icon={HiOutlineXCircle}
                  // size='sm'
                  className='text-typo-icons absolute right-1 top-1/2 -translate-y-1/2 transform text-lg'
                />
              ) : (
                <HiOutlineCalendar className='text-typo-icons pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-lg' />
              )}
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
          </>
        )}
      />
    </div>
  );
}

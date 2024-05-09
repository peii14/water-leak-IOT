import { Controller, useFormContext } from 'react-hook-form';

type OptionStateProps = {
  readonly name: string;
  readonly options: string[];
  readonly className?: string;
};

export default function OptionState({
  name,
  options,
  className,
}: OptionStateProps) {
  const { control } = useFormContext();

  return (
    <div className={className}>
      {options.map((option) => (
        <Controller
          key={option}
          name={name}
          defaultValue={options[0]}
          control={control}
          render={({ field }) => (
            <label className='inline-flex items-center'>
              <input
                type='radio'
                {...field}
                value={option}
                checked={field.value === option}
                className='hidden'
                onChange={(e) => field.onChange(e.target.value)}
              />
              <span
                className={`${
                  field.value === option
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-300 text-gray-700 opacity-70'
                } ring-primary-700 inline-block cursor-pointer rounded-full px-4 py-0.5 transition-colors duration-300 hover:ring-2`}
              >
                {option}
              </span>
            </label>
          )}
        />
      ))}
    </div>
  );
}

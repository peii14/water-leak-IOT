import { ChevronDown, Filter, X } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import Button from '@/_components/shared/buttons/Button';
import IconButton from '@/_components/shared/buttons/IconButton';
import Radio from '@/_components/shared/forms/Radio';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/shared/popover/Popover';
import Typography from '@/_components/shared/Typography';

export type PopupFilterProps<T extends Record<string, string>> = {
  filterOption: {
    id: Extract<keyof T, string>;
    name: string;
    options: {
      id: string;
      name: string;
    }[];
  }[];
  setFilterQuery: React.Dispatch<React.SetStateAction<{ status: string }>>;
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function PopupFilter<T extends Record<string, string>>({
  filterOption,
  setFilterQuery,
  title = 'Filter',
}: PopupFilterProps<T>) {
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { control, setValue } = methods;

  const filter: string = useWatch({
    control,
    name: 'filter',
  });
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    setFilterQuery({ status: filter?.toString().split('.')[1] });
  }, [filter, filterOption, setFilterQuery]);

  const resetFilter = () => setValue('filter[]', '');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          leftIcon={Filter}
          rightIcon={ChevronDown}
          className='bg-primary-100'
        >
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' className='w-md'>
        <FormProvider {...methods}>
          <div className='flex items-center justify-between'>
            <Typography variant='h6'>Filter by</Typography>
            <div className='flex items-center gap-3'>
              <Typography
                as='button'
                variant='b3'
                onClick={resetFilter}
                className='text-primary-500 cursor-pointer font-semibold underline'
              >
                Reset Filter
              </Typography>
              <PopoverClose>
                <IconButton variant='ghost' icon={X} />
              </PopoverClose>
            </div>
          </div>
          {filterOption.map((item) => (
            <div key={item.id}>
              <Typography variant='s3' color='secondary' className='mt-4'>
                {item.name}
              </Typography>
              <div className='mt-2'>
                {item.options.map((option) => (
                  <Radio
                    key={`${item.id}.${option.id}`}
                    name='filter'
                    value={`${item.id}.${option.id}`}
                    label={option.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </FormProvider>
      </PopoverContent>
    </Popover>
  );
}

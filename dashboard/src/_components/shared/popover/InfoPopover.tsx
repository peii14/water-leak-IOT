import { Info } from 'lucide-react';
import * as React from 'react';

import IconButton from '@/_components/shared/buttons/IconButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/shared/popover/Popover';
import clsxm from '@/_lib/clsxm';
import { ExtractProps } from '@/_types/helper';

type InfoPopoverProps = {
  children: React.ReactNode;
  classNames?: {
    content?: string;
    trigger?: string;
  };
} & ExtractProps<typeof Popover>;

export default function InfoPopover({
  classNames,
  children,
  ...rest
}: InfoPopoverProps) {
  return (
    <Popover {...rest}>
      <PopoverTrigger asChild>
        <IconButton
          variant='ghost'
          className={clsxm([
            'text-typo-icons rounded-full',
            classNames?.trigger,
          ])}
          icon={Info}
        />
      </PopoverTrigger>
      <PopoverContent
        side='top'
        className={clsxm(['w-60 p-2', classNames?.content])}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

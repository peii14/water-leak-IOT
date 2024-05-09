import { Menu } from '@headlessui/react';
import React from 'react';

type OptionType = {
  name: string;
  icon?: React.ReactNode;
  componentOrAction: React.ReactNode | (() => void);
};

type DropdownButtonProps = {
  children: React.ReactNode;
  options: OptionType[];
};

export default function DropdownButton({
  children,
  options,
}: DropdownButtonProps) {
  const renderOptionContent = (option: OptionType) => {
    if (typeof option.componentOrAction === 'function') {
      return (
        <button
          className='flex w-full items-center gap-1 py-2 pl-3 pr-11 text-left text-gray-700'
          onClick={() => {
            if (typeof option.componentOrAction === 'function') {
              option.componentOrAction();
            }
          }}
        >
          {option.icon}
          {option.name}
        </button>
      );
    } else {
      // For components, we return the component as is
      return option.componentOrAction;
    }
  };

  return (
    <Menu>
      <Menu.Button>{children}</Menu.Button>
      <Menu.Items className='border-primary-200 absolute mt-9 overflow-hidden rounded-xl border bg-white shadow-lg'>
        {options.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <div className={`${active ? 'bg-gray-100' : ''}`}>
                {renderOptionContent(item)}
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

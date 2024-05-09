import { Red_Rose } from 'next/font/google';
import * as React from 'react';

import clsxm from '@/_lib/clsxm';
import { TypographyVariant } from '@/_types/components/Typography.type';

const TypographyColor = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'white',
] as const;

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  color?: (typeof TypographyColor)[number];
  /**
   * | Variant | Size Class | Font Size | Font Weight |
   * | :------ | :--------- | :-------- | :---------- |
   * | j1      | text-4xl   | 36px      | 700         |
   * | j2      | text-3xl   | 30px      | 700         |
   * | h1      | text-2xl   | 24px      | 600         |
   * | h2      | text-xl    | 20px      | 600         |
   * | h3      | text-lg    | 18px      | 600         |
   * | h4      | text-base  | 16px      | 700         |
   * | h5      | text-base  | 16px      | 600         |
   * | h6      | text-sm    | 14px      | 600         |
   * | s1      | text-lg    | 18px      | 500         |
   * | s2      | text-base  | 16px      | 500         |
   * | s3      | text-sm    | 14px      | 500         |
   * | s4      | text-xs    | 12px      | 500         |
   * | b1      | text-lg    | 18px      | 400         |
   * | b2      | text-base  | 16px      | 400         |
   * | b3      | text-sm    | 14px      | 400         |
   * | c1      | text-xs    | 12px      | 400         |
   * | c2      | -          | 11px      | 400         |
   */
  variant: TypographyVariant;
  children: React.ReactNode;
  font?: 'primary' | 'secondary';
} & React.ComponentPropsWithoutRef<T>;

type TypographyComponent = <T extends React.ElementType = 'p'>(
  props: TypographyProps<T>
) => React.ReactElement | null;

const redRose = Red_Rose({ subsets: ['latin'] });

const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = 'p'>(
    {
      as,
      children,
      className,
      color = 'primary',
      variant,
      font = 'primary',
      ...rest
    }: TypographyProps<T>,
    ref?: React.ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'p';
    return (
      <Component
        ref={ref}
        className={clsxm(
          //#region  //*=========== Variants ===========
          [
            variant === 'sj1' && ['text-9xl tracking-wider'],
            variant === 'sj2' && ['text-6xl tracking-wide'],
            variant === 'sj3' && ['text-5xl tracking-wide'],
            variant === 'sj4' && ['text-4xl tracking-wide'],
            variant === 'j1' && ['text-4xl font-bold'],
            variant === 'j2' && ['text-3xl font-bold'],
            variant === 'h1' && ['text-2xl font-semibold'],
            variant === 'h2' && ['text-xl font-semibold'],
            variant === 'h3' && ['text-lg font-semibold'],
            variant === 'h4' && ['text-base font-bold'],
            variant === 'h5' && ['text-base font-semibold'],
            variant === 'h6' && ['text-sm font-semibold'],
            variant === 's1' && ['text-lg font-medium'],
            variant === 's2' && ['text-base font-medium'],
            variant === 's3' && ['text-sm font-medium'],
            variant === 's4' && ['text-xs font-medium'],
            variant === 'b1' && ['text-lg'],
            variant === 'b2' && ['font-primary text-base'],
            variant === 'b3' && ['text-sm font-normal'],
            variant === 'c1' && ['text-xs'],
            variant === 'c2' && ['text-[11px] leading-[14px]'],
            variant === 'p1' && ['text-[9px] font-thin leading-[9px]'],
          ],
          //#endregion  //*======== Variants ===========
          //#region  //*=========== Color ===========
          [
            color === 'primary' && ['text-[#3E4555]'],
            color === 'secondary' && ['text-[#676767]'],
            color === 'tertiary' && ['text-[#A6A6A6]'],
            color === 'white' && ['text-white'],
            color === 'danger' && ['text-red-500'],
          ],
          //#endregion  //*======== Color ===========
          className,
          font === 'secondary' ? redRose.className : ''
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
) as TypographyComponent;

export default Typography;

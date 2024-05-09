import NextImage from '@/_components/shared/NextImage';

type LogoProps = {
  readonly className?: string;
  readonly classNames?: {
    image?: string;
    wrapper?: string;
  };
};
export default function Logo({ className, classNames }: LogoProps) {
  return (
    <NextImage
      priority
      className={`w-full ${className}`}
      classNames={classNames}
      src='/images/logo.png'
      alt='Logo'
      width={80}
      height={50}
      quality={100}
      layout='responsive'
    />
  );
}

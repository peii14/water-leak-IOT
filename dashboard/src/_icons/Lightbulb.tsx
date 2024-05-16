const LightbulbIcon = ({ color = '#FFD700' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 22s-7-4.5-7-11a7 7 0 1 1 14 0c0 6.5-7 11-7 11z' />
      <path d='M10.5 15h3m-1.5 0v4' />
    </svg>
  );
};

export default LightbulbIcon;
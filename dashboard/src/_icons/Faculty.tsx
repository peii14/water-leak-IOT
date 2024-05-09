const FacultyIcon = ({ color = '#5050A1' }: { color?: string }) => {
  return (
    <svg
      width='24'
      height='19'
      viewBox='0 0 24 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.7777 14.7083V7.52083L12.4027 12.625L0.944336 6.375L12.4027 0.125L23.861 6.375V14.7083H21.7777ZM12.4027 18.875L5.111 14.9167V9.70833L12.4027 13.6667L19.6943 9.70833V14.9167L12.4027 18.875Z'
        fill={color}
      />
    </svg>
  );
};
export default FacultyIcon;

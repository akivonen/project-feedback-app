export const Icons = {
  Circle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="50"></circle>
    </svg>
  ),
  ArrowDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
};

export const Icons = {
  Circle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50"></circle>
    </svg>
  ),
  ArrowDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  ArrowUp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6l4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="7" height="10" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L2 5l4-4" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" />
    </svg>
  ),
  Comments: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="18" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
        fill="#CDD2EE"
        fillRule="nonzero"
      />
    </svg>
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="13" height="11" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5.233L4.522 9 12 1" fill="none" stroke="#AD1FEA" strokeWidth="2" />
    </svg>
  ),
};

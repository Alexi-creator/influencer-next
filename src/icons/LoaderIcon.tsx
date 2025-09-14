export const LoaderIcon = ({ ...props }) => (
  <svg
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="0.8s"
        values="0 25 25;360 25 25"
        keyTimes="0;1"
      />
    </circle>
  </svg>
)

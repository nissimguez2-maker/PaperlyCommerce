/** Forward arrow that flips automatically under RTL. */
export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      aria-hidden
      className={`flip-rtl ${className}`}
    >
      <path
        d="M12 1l5 5-5 5M1 6h16"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

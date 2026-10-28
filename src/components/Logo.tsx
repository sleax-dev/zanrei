/** The Zanrei mark: a slash through a Z, in the brand orange. Same shape as the app icon. */
export function Logo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden>
      <path d="M148 148h216L148 364h216" fill="none" stroke="#FF6A1A" strokeWidth="56" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

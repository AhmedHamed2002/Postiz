// Inline SVG flag components — drop-in replacement for country-flag-icons
// Paths sourced from public-domain SVG references.

export function FlagUS({ className = "h-4 w-6 rounded-[2px]" }: { className?: string }) {
  // 13 stripes + blue canton with 50 stars (simplified)
    const stripes = Array.from({ length: 13 }, (_, i) => i);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 32" className={className}>
        {/* 13 alternating red/white stripes */}
        {stripes.map((i) => (
            <rect key={i} x="0" y={i * (32 / 13)} width="60" height={32 / 13}
            fill={i % 2 === 0 ? "#B22234" : "#fff"} />
        ))}
        {/* Blue canton */}
        <rect x="0" y="0" width="24" height={32 * 7 / 13} fill="#3C3B6E" />
        {/* Stars — 5×4 + 4×5 simplified as dots */}
        {[0,1,2,3,4].map((row) =>
            [0,1,2,3,4,5].map((col) => (
            <circle key={`${row}-${col}`}
                cx={2 + col * 4} cy={2 + row * 3.4}
                r="0.7" fill="#fff" />
            ))
        )}
        {[0,1,2,3].map((row) =>
            [0,1,2,3,4].map((col) => (
            <circle key={`s-${row}-${col}`}
                cx={4 + col * 4} cy={3.7 + row * 3.4}
                r="0.7" fill="#fff" />
            ))
        )}
        </svg>
    );
}

export function FlagBH({ className = "h-4 w-6 rounded-[2px]" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" className={className}>
        {/* White section */}
        <rect width="60" height="40" fill="#fff"/>
        {/* Red section */}
        <rect x="17" width="43" height="40" fill="#CE1126"/>
        {/* White serrated border — 5 triangles */}
        <path d="M17,0 L28,4 L17,8 L28,12 L17,16 L28,20 L17,24 L28,28 L17,32 L28,36 L17,40 L0,40 L0,0 Z" fill="#fff"/>
        </svg>
    );
}

export function FlagCN({ className = "h-4 w-6 rounded-[2px]" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className={className}>
        {/* Red background */}
        <rect width="30" height="20" fill="#DE2910"/>
        {/* Large star */}
        <polygon points="5,2 6.18,5.09 9.51,5.09 6.9,7.06 7.94,10.18 5.3,8.18 2.57,10.09 3.69,7.09 1,5.09 4.33,5.09" fill="#FFDE00"/>
        {/* 4 small stars */}
        <polygon points="10,1 10.59,2.73 12.41,2.73 11,3.77 11.54,5.5 10.09,4.5 8.64,5.45 9.22,3.77 7.77,2.73 9.59,2.73" fill="#FFDE00"/>
        <polygon points="12,4 12.59,5.73 14.41,5.73 13,6.77 13.54,8.5 12.09,7.5 10.64,8.45 11.22,6.77 9.77,5.73 11.59,5.73" fill="#FFDE00"/>
        <polygon points="12,8 12.59,9.73 14.41,9.73 13,10.77 13.54,12.5 12.09,11.5 10.64,12.45 11.22,10.77 9.77,9.73 11.59,9.73" fill="#FFDE00"/>
        <polygon points="10,11 10.59,12.73 12.41,12.73 11,13.77 11.54,15.5 10.09,14.5 8.64,15.45 9.22,13.77 7.77,12.73 9.59,12.73" fill="#FFDE00"/>
        </svg>
    );
}

export function FlagSA({ className = "h-4 w-6 rounded-[2px]" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" className={className}>
        {/* Green background */}
        <rect width="60" height="40" fill="#006C35"/>
        {/* Simplified Shahada and sword */}
        <path d="M15,15 Q30,10 45,15 M15,20 Q30,18 45,20" stroke="#fff" strokeWidth="2" fill="none"/>
        <path d="M15,28 L45,28 L42,26 M45,28 L42,30" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
    );
}

// Map lang code → flag component
export const FLAG_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    en: FlagUS,
    ar: FlagSA,
    zh: FlagCN,
};

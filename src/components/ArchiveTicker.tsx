interface ArchiveTickerProps {
  items: string[];
  className?: string;
}

export function ArchiveTicker({ items, className = '' }: ArchiveTickerProps) {
  const repeatedItems = [...items, ...items];

  return (
    <div className={`archive-ticker ${className}`.trim()}>
      <div className="archive-ticker-track">
        {repeatedItems.map((item, index) => (
          <span key={`${item}-${index}`} className="archive-ticker-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

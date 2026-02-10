export function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    const d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    const m = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  
    return `${d} ${m}, ${y}`;
  }

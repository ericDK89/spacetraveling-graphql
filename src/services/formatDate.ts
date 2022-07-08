import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: string): string {
  const formattedDate = format(parseISO(date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  return formattedDate;
}

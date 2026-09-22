import { useState } from 'react';
import { KitchenTicket, kitchenTickets as initialTickets } from '../data/mockData';

export interface UseOrderQueueReturn {
  readonly tickets: readonly KitchenTicket[];
  readonly markCashCollected: (ticketId: string) => void;
  readonly markReady: (ticketId: string) => void;
  readonly markHandover: (ticketId: string) => void;
}

export function useOrderQueue(): UseOrderQueueReturn {
  const [tickets, setTickets] = useState<readonly KitchenTicket[]>(initialTickets);

  const markCashCollected = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, paymentStatus: 'PAID' as const, stage: 'brewing' as const }
          : t
      )
    );
  };

  const markReady = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, stage: 'ready' as const }
          : t
      )
    );
  };

  const markHandover = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, stage: 'handover' as const }
          : t
      )
    );
  };

  return {
    tickets,
    markCashCollected,
    markReady,
    markHandover,
  };
}

export default useOrderQueue;

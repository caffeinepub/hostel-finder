import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Hostel, HostelId } from '../backend';

export function useGetAllHostels() {
  const { actor, isFetching } = useActor();

  return useQuery<Hostel[]>({
    queryKey: ['hostels', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listHostels();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHostelsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Hostel[]>({
    queryKey: ['hostels', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHostelsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHostel(hostelId: HostelId) {
  const { actor, isFetching } = useActor();

  return useQuery<Hostel>({
    queryKey: ['hostel', hostelId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getHostel(hostelId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVisitorCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['visitorCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getVisitorCount();
    },
    enabled: !!actor && !isFetching,
    // Refresh visitor count every 60 seconds
    refetchInterval: 60000,
  });
}

export function useGetEarningsStats() {
  const { actor, isFetching } = useActor();

  return useQuery<{ visitorCount: bigint }>({
    queryKey: ['earningsStats'],
    queryFn: async () => {
      if (!actor) return { visitorCount: BigInt(0) };
      return actor.getEarningsStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60000,
  });
}

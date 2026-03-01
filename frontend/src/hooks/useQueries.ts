import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Hostel, Category, HostelId } from '../backend';

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

export function useGetHostelsByCategory(category: Category) {
  const { actor, isFetching } = useActor();

  return useQuery<Hostel[]>({
    queryKey: ['hostels', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listHostelsByCategory(category);
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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Hostel, RoomSharing, UpdateHostelInput } from '../backend';

interface AddHostelParams {
  name: string;
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  roomCapacityDetails: RoomSharing;
  imageUrls: string[];
  ownerContact: string;
  amenities?: string[];
  isSponsored?: boolean | null;
}

export function useAddHostel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<Hostel, Error, AddHostelParams>({
    mutationFn: async (params: AddHostelParams) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      return actor.addHostel(
        params.name,
        params.category,
        params.description,
        params.address,
        params.latitude,
        params.longitude,
        params.roomCapacityDetails,
        params.imageUrls,
        params.ownerContact,
        params.amenities ?? [],
        params.isSponsored ?? null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostels'] });
    },
  });
}

export function useUpdateHostel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateHostelInput>({
    mutationFn: async (updateInput: UpdateHostelInput) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      return actor.updateHostel(updateInput);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hostels'] });
      queryClient.invalidateQueries({ queryKey: ['hostel', variables.id.toString()] });
    },
  });
}

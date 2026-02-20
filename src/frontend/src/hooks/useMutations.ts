import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Hostel, Category, RoomSharing, UpdateHostelInput } from '../backend';
import { ExternalBlob } from '../backend';

interface AddHostelParams {
  name: string;
  category: Category;
  description: string;
  address: string;
  roomCapacityDetails: RoomSharing;
  imageBlobs: ExternalBlob[];
  ownerContact: string;
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
        params.roomCapacityDetails,
        params.imageBlobs,
        params.ownerContact
      );
    },
    onSuccess: () => {
      // Invalidate all hostel queries to refresh the list
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
      // Invalidate all hostel queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['hostels'] });
      // Invalidate the specific hostel query
      queryClient.invalidateQueries({ queryKey: ['hostel', variables.id.toString()] });
    },
  });
}

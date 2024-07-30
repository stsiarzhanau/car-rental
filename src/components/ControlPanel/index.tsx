import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { toast } from 'sonner';

import { rentIdAtom, returnIdAtom, returnLocationAtom } from '../../atoms';
import { rentCar, returnCar } from '../../requests';
import { Location } from '../../types';

export default function ControlPanel() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [rentId, setRentId] = useAtom(rentIdAtom);
  const [returnId, setReturnId] = useAtom(returnIdAtom);
  const [returnLocation, setReturnLocation] = useAtom(returnLocationAtom);

  const rentMutation = useMutation({
    mutationFn: (data: { id: string; name: string }) => rentCar(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cars'] });
      setName('');
      setRentId(null);
      toast.success(`Dear ${name}, thank you for renting a car!`);
    },
  });

  const returnMutation = useMutation({
    mutationFn: (data: { id: string; location: Location }) => returnCar(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cars'] });
      setReturnId(null);
      setReturnLocation(null);
      toast.success(`Thank you for returning the car!`);
    },
    onError: () => {
      setReturnLocation(null);
    },
  });

  const handleRentButtonClick = () => {
    if (!rentId && !name) {
      toast.info('Please enter your name and select the desired car on the map');
    } else if (!rentId) {
      toast.info('Please select the desired car on the map');
    } else if (!name) {
      toast.info('Please enter your name');
    } else {
      rentMutation.mutate({
        id: rentId,
        name,
      });
    }
  };

  const handleReturnButtonClick = () => {
    if (!returnId && !returnLocation) {
      toast.info(
        'Please select the car you want to return by clicking on the corresponding table row and then specify the return location on the map',
      );
    } else if (!returnId) {
      toast.info(
        'Please select the car you want to return by clicking on the corresponding table row',
      );
    } else if (!returnLocation) {
      toast.info('Please specify the return location on the map');
    } else {
      returnMutation.mutate({
        id: returnId,
        location: returnLocation,
      });
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="m-4 mb-14 lg:mb-4 lg:flex">
      <input
        className="mb-2 h-12 w-full border border-gray-600 bg-gray-800 px-4 py-2 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-2  focus:ring-blue-500/50 lg:me-2 lg:grow"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
      />

      <div className="grid grid-cols-2 gap-2 lg:min-w-fit">
        <button
          className="h-12 bg-blue-600 px-4 py-2 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          onClick={handleRentButtonClick}
        >
          Rent
        </button>

        <button
          className="h-12 bg-blue-600 px-4 py-2 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          onClick={handleReturnButtonClick}
        >
          Return
        </button>
      </div>
    </div>
  );
}

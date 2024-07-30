import { useQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { twMerge } from 'tailwind-merge';

import { returnIdAtom, returnLocationAtom } from '../../atoms';
import { getCars } from '../../requests';
import { Car, Location } from '../../types';
import CarTableSkeleton from '../CarTableSkeleton';

const columns: ColumnDef<Car>[] = [
  {
    header: 'Model',
    accessorKey: 'model',
  },
  {
    header: 'Vendor',
    accessorKey: 'vendor',
  },
  {
    header: 'Available',
    accessorKey: 'available',
    cell: (info) => (
      <div className="grid place-items-center">
        {info.getValue() ? <img src="/checkmark.svg" className="w-4" alt="Yes" /> : ''}
      </div>
    ),
  },
  {
    header: 'Booked By',
    accessorKey: 'bookedBy',
    cell: (info) => info.getValue() ?? '-',
  },
  {
    header: 'Booked At',
    accessorKey: 'bookedAt',
    cell: (info) => (info.getValue() ? format(info.getValue() as Date, 'dd.MM.yy HH:mm:ss') : '-'),
  },
  {
    header: 'Location',
    accessorKey: 'location',
    cell: (info) =>
      `${(info.getValue() as Location)?.lat?.toFixed(4)}° ${(info.getValue() as Location)?.lng?.toFixed(4)}° 0.0m`,
  },
];

const fallbackData = [] as Car[];

export default function CarTable() {
  const { data, isPending } = useQuery<Car[]>({ queryKey: ['cars'], queryFn: getCars });
  const [returnId, setReturnId] = useAtom(returnIdAtom);
  const [, setReturnLocation] = useAtom(returnLocationAtom);

  const table = useReactTable({
    data: data! ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: Row<Car>) => {
    if (!row.original.available) {
      if (row.original.id !== returnId) {
        setReturnId(row.original.id);
      } else {
        setReturnLocation(null);
        setReturnId(null);
      }
    }
  };

  if (isPending) {
    return <CarTableSkeleton />;
  }

  if (data) {
    return (
      <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
        <thead className="sticky top-0 bg-inherit">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-700">
          {table.getRowModel().rows.map((row) => {
            const isActiveRow = row.original.id === returnId;

            return (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row)}
                className={twMerge(
                  clsx('transition-colors duration-200 hover:bg-gray-700', {
                    'cursor-pointer': !row.original.available,
                    'bg-cyan-950 hover:bg-cyan-950': isActiveRow,
                  }),
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

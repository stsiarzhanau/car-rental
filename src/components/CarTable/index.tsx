import { useQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import { returnIdAtom, returnLocationAtom } from '../../atoms';
import { getCars } from '../../requests';
import { Car, Location } from '../../types';

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
    cell: (info) => (info.getValue() ? <img src="/checkmark.svg" className="w-4" alt="Yes" /> : ''),
  },
  {
    header: 'Booked By',
    accessorKey: 'bookedBy',
  },
  {
    header: 'Booked At',
    accessorKey: 'bookedAt',
    cell: (info) => (info.getValue() as Date)?.toLocaleString(),
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
  const { data } = useQuery<Car[]>({ queryKey: ['cars'], queryFn: getCars });
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

  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800">
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
      <tbody className="divide-y divide-gray-700 bg-gray-800">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => handleRowClick(row)}
            className={clsx({ 'bg-gray-700': row.original.id === returnId })}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={clsx('whitespace-nowrap px-6 py-4 text-sm text-gray-400', {
                  'text-gray-50': row.original.id === returnId,
                })}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

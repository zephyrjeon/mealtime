'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getMy } from '~/components/hooks/useMy';
import { Button } from '~/components/ui/button';
import { appRoutes } from '~/const/routes';

const MenuItemsPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['my-merchant'],
    queryFn: getMy,
  });
  console.log(10000, data);
  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex justify-between">
        <h3 className="text-2xl">All items</h3>
        <Button variant={'default'}>
          <Link href={appRoutes.addMenuItem}>Add item</Link>
        </Button>
      </div>
      <div></div>
      <div className="flex-[3]" />
    </div>
  );
};

export default MenuItemsPage;

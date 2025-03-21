'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { appRoutes } from '~/const/routes';

type List = {
  image: string;
};

const MenuItemsPage = () => {
  const [list, setList] = useState<List[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const requests = new Array(5)
      .fill(0)
      .map(() => fetch('https://foodish-api.com/api').then((r) => r.json()));
    const response = await Promise.all(requests);
    setList(response);
  };

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex justify-between">
        <h3 className="text-2xl">All items</h3>
        <Button variant={'default'}>
          <Link href={appRoutes.addMenuItem}>Add item</Link>
        </Button>
      </div>
      <div>
        {list.map((i, index) => {
          return (
            <div key={index.toString()} className="w-[200px] h-[200px]">
              <img src={i.image} />
            </div>
          );
        })}
      </div>
      <div className="flex-[3]" />
    </div>
  );
};

export default MenuItemsPage;

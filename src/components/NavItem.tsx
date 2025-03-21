import Link from 'next/link';

interface INavItemProps {
  linkTo: string;
  value: string;
}

export const NavItem = (props: INavItemProps) => {
  return (
    <div className="w-full min-h-12 hover:bg-gray-200">
      <Link
        href={props.linkTo}
        className="w-full h-full justify-center items-center cursor-pointer "
      >
        <p className="px-4 flex w-full h-full items-center">{props.value}</p>
      </Link>
    </div>
  );
};

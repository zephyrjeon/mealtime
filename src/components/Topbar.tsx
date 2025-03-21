import { MenuIcon } from 'lucide-react';
import { SigninButton } from './SigninButton';

interface ITopBarProps {
  isCollapsed: boolean;
  onClickMenu: () => void;
  isMobile: boolean;
}

export const Topbar = (props: ITopBarProps) => {
  const { isCollapsed, onClickMenu, isMobile } = props;

  if (isMobile && !isCollapsed) {
    return null;
  }

  return (
    <header className="flex px-4 h-full bg-gray-100 items-center">
      {isCollapsed && (
        <>
          <MenuIcon
            role="button"
            onClick={onClickMenu}
            className="h-6 w-6 text-muted-foreground"
          />
          <p className="pl-4">Mealtime Merchant</p>
        </>
      )}

      <SigninButton />
    </header>
  );
};

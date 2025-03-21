'use client';

import { ChevronsLeft } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '~/lib/utils';
import { Topbar } from './Topbar';
import { NavItem } from './NavItem';
import { appRoutes } from '~/const/routes';

const MIN_NAV_WIDTH = 360;
const NAV_ITEMS = [
  { value: 'My Store', linkTo: appRoutes.dashboard },
  {
    value: 'Menu Items',
    linkTo: appRoutes.menuItems,
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)', {
    defaultValue: true,
    initializeWithValue: false,
  });
  const sidebarRef = React.useRef<React.ElementRef<'aside'>>(null);
  const topbarRef = React.useRef<React.ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  const resetNavWidth = () => {
    if (sidebarRef.current && topbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : `${MIN_NAV_WIDTH}px`;
      topbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : `calc(100% - ${MIN_NAV_WIDTH}px)`
      );
      topbarRef.current.style.setProperty(
        'left',
        isMobile ? '100%' : `${MIN_NAV_WIDTH}px`
      );
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCollapse = () => {
    if (sidebarRef.current && topbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = '0';
      topbarRef.current.style.setProperty('width', '100%');
      topbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300); // transition time on aside element
    }
  };

  React.useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      resetNavWidth();
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      handleCollapse();
    }
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          `group/sidebar h-full bg-secondary overflow-y-auto relative flex w-[${MIN_NAV_WIDTH}px] flex-col z-[99999]`,
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div className="h-16">
          {!isCollapsed && <p className="px-4 py-5">Mealtime Merchant</p>}
          <div
            onClick={handleCollapse}
            role="button"
            className={cn(
              'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-[22px] right-5 group-hover/sidebar:opacity-100 transition'
            )}
          >
            <ChevronsLeft className="h-6 w-6" />
          </div>
        </div>
        {NAV_ITEMS.map((item) => {
          return (
            <NavItem value={item.value} linkTo={item.linkTo} key={item.value} />
          );
        })}
      </aside>

      <div
        ref={topbarRef}
        className={cn(
          `absolute top-0 z-[99999] dark:bg-[#1F1F1F] left-[${MIN_NAV_WIDTH}px] w-[calc(100%-${MIN_NAV_WIDTH}px)] h-16`,
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <Topbar
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          onClickMenu={resetNavWidth}
        />
      </div>
    </>
  );
};

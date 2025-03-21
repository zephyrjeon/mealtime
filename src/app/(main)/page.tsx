import { SigninButton } from '~/components/SigninButton';

const MainPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1f1f1f] pt-32">
      <div className="flex-[2]" />
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <SigninButton />
      </div>
      <div className="flex-[3]" />
    </div>
  );
};

export default MainPage;

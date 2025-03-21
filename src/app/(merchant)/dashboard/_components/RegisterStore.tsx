'use client';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { createMerchant } from '~/components/hooks/useCreateMerchant';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export const RegisterStore = () => {
  const session = useSession();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const createMerchantMutation = useMutation({
    mutationFn: createMerchant,
  });

  const disableSubmit = !name || !phoneNumber || !address;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createMerchantMutation.mutate({
      userId: session.data?.user.id!,
      name,
      phoneNumber,
      address,
      image: image ?? undefined,
    });
  };

  if (createMerchantMutation.isError) {
    return <p>Fail</p>;
  }

  if (createMerchantMutation.isSuccess) {
    return <p>Success</p>;
  }

  return (
    <div>
      <div className="flex flex-col h-full w-full items-center justify-center px-[20px] py-[80px] sm:px-[60px] sm:py-[60px] xl:px-[120px]">
        <h1 className="text-4xl p-8">Register Your Store</h1>
        <div className="card-background flex w-full max-w-[1280px] flex-col rounded-[20px] px-[20px] py-[20px] text-center sm:px-[60px] lg:rounded-[50px] xl:px-[120px] ">
          <form onSubmit={handleSubmit}>
            <div className="w-full items-center">
              <div
                className={`mt-[30px] flex flex-col sm:flex-row 3xl:mt-[58px]`}
              >
                <input
                  className={`${inputClassNames} sm:mr-[15px]`}
                  placeholder="Store name*"
                  type="text"
                  name="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={`${inputClassNames} mt-[30px] sm:ml-[15px] sm:mt-0`}
                  placeholder="Phone number*"
                  type="text"
                  name="phoneNumber"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <input
                className={`${inputClassNames} mt-[30px]`}
                placeholder="Address*"
                type="text"
                name="address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div
              className={`${inputClassNames} mt-[30px] flex flex-col text-left`}
            >
              <label htmlFor="mainImage" className="py-2">
                Upload store image*
                <div className="relative flex items-center">
                  <span
                    className={cn(
                      'mr-2 rounded-[2px] bg-gray-200 px-2 py-1',
                      'dark:bg-white dark:!text-black'
                    )}
                  >
                    Choose File
                  </span>
                  <span>{image ? image.name : 'No file chosen'}</span>
                  <input
                    type="file"
                    placeholder="Store Image"
                    accept=".jpec,.png,.jpg"
                    name="image"
                    id="mainImage"
                    className="absolute left-0 top-0 h-full w-full opacity-0"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                        setImageLink(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </div>
                {imageLink && (
                  <div className="w-full h-full object-contain">
                    <img
                      className="w-[200px] h-[200px] object-contain"
                      src={imageLink}
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="row mt-[30px] justify-center 3xl:mt-[58px]">
              <Button
                type="submit"
                disabled={disableSubmit}
                // onClick={() => setSending(true)}
                className={`btn-submit`}
              >
                {createMerchantMutation.isPending ? 'Sending...' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputClassNames = cn(
  '3xl:leading-10',
  '3xl:text-3xl',
  'leading-normal',
  'text-base',
  'input truncate text-text-default py-[8px] px-[20px] border border-black/50 w-full rounded-[8px] bg-white dark:text-white',
  'dark:bg-transparent dark:border-white'
);

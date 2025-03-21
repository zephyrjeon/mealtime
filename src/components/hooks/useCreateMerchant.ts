'use server';

import { CreateMerchantInput } from '~/schemas/merchant/inputs/createMerchantInput';

export const createMerchant = async (input: CreateMerchantInput) => {
  const formData = new FormData();

  Object.keys(input).forEach((key) => {
    if (key === 'image' && input.image) {
      formData.append('image', input.image);
    } else {
      formData.append(
        key,
        JSON.stringify(input[key as keyof CreateMerchantInput])
      );
    }
  });

  await fetch(`http://localhost:3000/api/merchants`, {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' }, => when given, request object can't be parsed by formData() mehtod
    body: formData,
  });
};

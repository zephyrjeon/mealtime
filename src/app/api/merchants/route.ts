import { merchantService } from '~/server/services/MerchantService';
import { getSession } from '../auth/[...nextauth]/route';
import { CreateMerchantInput } from '~/schemas/merchant/inputs/createMerchantInput';

export async function GET(request: Request) {
  const session = await getSession();

  if (!session?.user) throw new Error('No Session');

  const list = await merchantService.getList();

  return new Response(JSON.stringify(list), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const input = {
    name: formData.get('name'),
    userId: formData.get('userId'),
    price: formData.get('price'),
    address: formData.get('address'),
    phoneNumber: formData.get('phoneNumber'),
    cuisines: formData.get('cuisines') ?? undefined,
    image: formData.get('image') ?? undefined,
  } as CreateMerchantInput;

  const newMerchant = await merchantService.create(input);

  return new Response(JSON.stringify(newMerchant), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

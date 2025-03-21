import { merchantService } from '~/server/services/MerchantService';
import { getSession } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  // const users = [
  //   { id: 1, name: 'Alice' },
  //   { id: 2, name: 'Bob' },
  // ];
  // return new Response(JSON.stringify(users), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });
  const session = await getSession();

  if (!session?.user) throw new Error('No Session');

  const my = await merchantService.getMy(session.user.id);

  return new Response(JSON.stringify(my), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

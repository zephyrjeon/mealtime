'use server';

export const getMy = async () => {
  await fetch(`http://localhost:3000/api/my`, {
    method: 'GET',
    // headers: { 'Content-Type': 'application/json' },
  });
};

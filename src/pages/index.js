import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    push('auth/login/');
  }, []);

  return <></>;
}

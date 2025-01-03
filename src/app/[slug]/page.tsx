'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { slug } = await params;
      router.push(`/api/shorten/${slug}`);
    })();
  }, [params, router]);

  return <div>Redirecting...</div>;
}

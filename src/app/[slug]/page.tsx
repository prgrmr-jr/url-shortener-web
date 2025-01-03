'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { slug } = await params;
      setIsLoading(true);
      router.push(`/api/shorten/${slug}`);
    })();
  }, [params, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <div className="text-center  max-w-md mx-auto">
          <p className="text-xl font-semibold text-black mb-4 animate-pulse">
            Please wait, redirecting...
          </p>
          <p className="text-sm text-gray-600">This may take a few seconds.</p>
        </div>
      ) : (
        <p className="text-black">Redirecting...</p>
      )}
    </div>
  );
}

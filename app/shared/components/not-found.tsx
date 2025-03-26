import { useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

export function NotFound({
  countdown = 5,
  redirectTo = '/',
  errorMessage = 'Oops! Page not found.',
}: {
  countdown?: number;
  redirectTo?: string;
  errorMessage?: string;
}) {
  const navigate = useNavigate();
  const [count, setCount] = useState(countdown);

  useEffect(() => {
    if (count === 0) {
      navigate({ to: redirectTo, replace: true });
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, navigate, redirectTo]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-[400px] text-center shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {errorMessage}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Redirecting in <span className="font-semibold">{count}</span>{' '}
            seconds...
          </p>
          <Link to={redirectTo}>
            <Button className="mt-4 cursor-pointer">Go back</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

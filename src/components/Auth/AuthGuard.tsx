import { User, UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export function AuthGuard({
  children,
  authParams,
}: {
  children: ReactNode;
  authParams: { allowedRoles: UserRole[]; redirectTo: string };
}) {
  const session = useSession();
  const [readyToRender, setReadyToRender] = useState(false);
  const user = session?.data?.user as User;
  const initializing = session?.status === 'loading';
  const isAuthenticated = session?.status === 'authenticated';

  const router = useRouter();

  useEffect(() => {
    if (!initializing) {
      if (!isAuthenticated) {
        router.push(authParams.redirectTo);
      }

      if (!authParams.allowedRoles.includes(user?.role)) {
        router.push(authParams.redirectTo);
      } else {
        setReadyToRender(true);
      }
    }
  }, [
    authParams.allowedRoles,
    authParams.redirectTo,
    initializing,
    isAuthenticated,
    router,
    user?.role,
  ]);

  if (!readyToRender) {
    return <h1>Application Loading</h1>;
  }

  if (readyToRender) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}

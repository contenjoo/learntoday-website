export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ClientContactPage from './ClientContactPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ClientContactPage />
    </Suspense>
  );
}

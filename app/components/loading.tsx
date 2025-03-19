import { Spinner } from '@/components/spinner';

// todo: deixar mais bonito
export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

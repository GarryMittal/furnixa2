import { LoaderCircle } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50">
      <h1 className="text-4xl font-bold tracking-[0.3em] text-neutral-900">
        FURNIXA
      </h1>

      <LoaderCircle className="mt-8 h-9 w-9 animate-spin text-neutral-700" />

      <div className="mt-10 h-1 w-56 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-neutral-900" />
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
        Loading Collection
      </p>
    </div>
  );
};

export default PageLoader;

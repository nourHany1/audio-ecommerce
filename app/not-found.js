import Link from "next/link";

function NotFound() {
  return (
    <div className="w-full h-screen bg-off-white flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="text-9xl text-primary-index animate-pulse">404</div>
        <div className="text-7xl">Page not found !</div>
        <Link href="." className="text-primary-index hover:text-primary-hover transition-all text-2xl font-bold cursor-pointer underline">Go back</Link>
      </div>
    </div>
  );
}

export default NotFound;

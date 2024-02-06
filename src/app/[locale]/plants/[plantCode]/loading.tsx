function Loading() {
  return (
    <div className="w-full max-w-[1440px] animate-pulse space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 px-8 lg:grid-cols-3 lg:px-0">
        <div className="flex flex-col gap-y-4">
          <div className="h-12 w-full rounded-md bg-gray-400 lg:w-full" />
          <div className="h-3 w-full rounded-md bg-gray-400 lg:w-full" />
          <div className="h-32 w-full rounded-md bg-gray-400 lg:w-4/5" />
          <div className="h-5 w-full rounded-md bg-gray-400 lg:w-4/5" />
          <div className="h-24 w-full rounded-md bg-gray-400 lg:w-4/5" />
        </div>
        <div className="col-span-1 flex flex-col gap-y-4 lg:col-span-2">
          <div className="h-12 w-full rounded-md bg-gray-400"></div>
          <div className="h-36 w-full rounded-md bg-gray-400"></div>
          <div className="h-60 w-full rounded-md bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
export default Loading;

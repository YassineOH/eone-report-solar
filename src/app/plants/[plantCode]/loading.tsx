function Loading() {
  return (
    <div className="w-full max-w-[1440px] animate-pulse space-y-12">
      <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-3">
        <div className="flex flex-col gap-y-4">
          <div className="h-12 w-full rounded-md bg-gray-400" />
          <div className="h-3 w-full rounded-md bg-gray-400" />
          <div className="h-32 w-4/5 rounded-md bg-gray-400" />
          <div className="h-5 w-4/5 rounded-md bg-gray-400" />
          <div className="h-24 w-4/5 rounded-md bg-gray-400" />
        </div>
        <div className="col-span-2 flex flex-col gap-y-4">
          <div className="h-12 w-full rounded-md bg-gray-400"></div>
          <div className="h-36 w-full rounded-md bg-gray-400"></div>
          <div className="h-60 w-full rounded-md bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
export default Loading;

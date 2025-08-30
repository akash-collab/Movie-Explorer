export default function Loader() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  );
}
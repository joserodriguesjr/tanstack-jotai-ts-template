export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
            <span className="ml-3 text-blue-500 text-sm font-medium">Loading...</span>
        </div>
    );
}
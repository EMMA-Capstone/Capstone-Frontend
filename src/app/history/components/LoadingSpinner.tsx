'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-3 border-white/30 border-t-green-500 rounded-full animate-spin" />
    </div>
  );
}
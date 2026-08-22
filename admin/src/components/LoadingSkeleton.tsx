import React from 'react';

export const LoadingSpinner: React.FC<{ size?: string }> = ({ size = 'w-6 h-6' }) => (
  <div className={`${size} border-2 border-t-transparent border-[#D4AF37] rounded-full animate-spin`} />
);

export const SkeletonCard: React.FC = () => (
  <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 animate-pulse space-y-3">
    <div className="h-4 bg-white/10 rounded w-1/3" />
    <div className="h-8 bg-white/10 rounded w-1/2" />
    <div className="h-3 bg-white/5 rounded w-2/3" />
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="bg-[#14151B] border border-white/10 rounded-2xl p-4 animate-pulse space-y-4">
    <div className="h-10 bg-white/10 rounded w-full" />
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="h-12 bg-white/5 rounded w-full" />
    ))}
  </div>
);

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  title = 'No Records Found',
  description = 'There are no items to display right now.',
  actionText,
  onAction,
}) => (
  <div className="bg-[#14151B] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl text-gray-400">
      📦
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm text-gray-400 max-w-sm">{description}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B59226] text-black font-semibold rounded-xl text-sm transition-colors"
      >
        {actionText}
      </button>
    )}
  </div>
);

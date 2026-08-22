import React, { useState } from 'react';

interface DynamicItemsInputProps {
  items: string[];
  onChange: (items: string[]) => void;
  label?: string;
}

export const DynamicItemsInput: React.FC<DynamicItemsInputProps> = ({
  items,
  onChange,
  label = 'Included Items',
}) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    onChange([...items, newItem.trim()]);
    setNewItem('');
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 8 Pcs Malai Boti"
          className="flex-1 bg-[#0D0E12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-semibold text-sm rounded-xl transition-colors"
        >
          Add Item
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No items added yet.</p>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#1A1C24] border border-white/5 px-3 py-2 rounded-xl text-sm text-gray-200"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

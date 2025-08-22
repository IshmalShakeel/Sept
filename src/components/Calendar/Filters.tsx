import React, { useState } from "react";

interface FiltersProps {
  onClose: () => void;
  onApply: (selectedTypes: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ onClose, onApply }) => {
  const filterOptions = ["Team Meeting", "Client Meeting", "Project Review", "Event Planning", "Birthday Party"];
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Filter Events</h2>
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {filterOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="cursor-pointer"
              />
              {option}
            </label>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;

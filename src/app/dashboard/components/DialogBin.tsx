"use client";

import { useState } from "react";
import { manrope } from "../../layout";

interface CompostBinDialogProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onSubmit: (value: string) => void;
}

export default function CompostBinDialog({ isOpen, onClose, onSubmit }: CompostBinDialogProps) {
  const [binId, setBinId] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Dialog container */}
      <div className="bg-[#424F40] rounded-xl p-6 w-[90%] max-w-sm shadow-lg border border-[#586757]">
        {/* Title */}
        <h2 className={`text-lg font-semibold text-white mb-4 ${manrope.className}`}>
          Add Composting Bin
        </h2>

        {/* Input field */}
        <div className="mb-5">
          <label
            htmlFor="binId"
            className={`block text-sm text-gray-200 mb-2 ${manrope.className}`}
          >
            Composting Bin ID
          </label>
          <input
            id="binId"
            type="text"
            value={binId}
            onChange={(e) => setBinId(e.target.value)}
            placeholder="Enter bin ID"
            className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {/* Secondary */}
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-sm transition-colors"
          >
            Cancel
          </button>

          {/* Primary */}
          <button
            onClick={() => onSubmit(binId)}
            className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white text-sm transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

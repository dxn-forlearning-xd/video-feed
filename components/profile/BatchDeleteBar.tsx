interface BatchDeleteBarProps {
  selectedCount: number;
  onDelete: () => void;
}

export default function BatchDeleteBar({
  selectedCount,
  onDelete,
}: BatchDeleteBarProps) {
  return (
    <div className="fixed bottom-15 left-0 right-0 z-30 max-w-125 mx-auto bg-black/80 backdrop-blur-md border-t border-zinc-800 p-4 flex items-center justify-between">
      <span className="text-sm font-medium text-zinc-300">
        Selected&nbsp;
        <span className="text-white font-bold">{selectedCount}&nbsp;</span>
        {selectedCount > 1 ? "items" : "item"}
      </span>

      <button
        onClick={onDelete}
        disabled={selectedCount === 0}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
          selectedCount > 0
            ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        }`}
      >
        Delete
      </button>
    </div>
  );
}

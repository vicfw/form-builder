"use client";

interface DraggableInputProps {
  type: "single-line" | "multiline";
  label: string;
  icon?: React.ReactNode;
}

export default function DraggableInput({
  type,
  label,
  icon,
}: DraggableInputProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md cursor-move hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
    >
      {icon && <div className="text-gray-500">{icon}</div>}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

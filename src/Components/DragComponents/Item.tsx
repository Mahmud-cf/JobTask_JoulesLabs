// Item.tsx

import { CSSProperties, forwardRef, HTMLAttributes, MouseEvent } from "react";
import { Todo } from "../TestAddText";

type Props = {
  item: Todo;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  onDelete: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  ({ item, isOpacityEnabled, isDragging, style, onDelete, ...props }, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    const handleDelete = (event: MouseEvent) => {
      if (event.button === 0) {
        // Only trigger the delete action for the left mouse button (primary button)
        onDelete(item.id);
      }
    };

    return (
      <li
        ref={ref}
        {...props}
        style={styles}
        className="uploaded-item flex justify-between items-center p-4 rounded mb-4"
        
      >
        <div className="flex items-center">
          <span className="mr-2">{item.id}: </span>
          <span
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
            className={item.completed ? "text-gray-500" : ""}
          >
            {item.text}
          </span>
        </div>
        {/* Render delete button */}
        <button onMouseDown={handleDelete} className="bg-red-500 text-white px-5 py-1 rounded">Delete</button>
      </li>
    );
  }
);

export default Item;

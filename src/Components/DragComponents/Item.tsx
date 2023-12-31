import { CSSProperties, forwardRef, HTMLAttributes, MouseEvent, Ref } from "react";
import { Todo } from "../TextAdd";

type Props = {
  item: Todo;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  onDelete: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  ({ item, isOpacityEnabled, isDragging, style, onDelete, ...props }, ref: Ref<HTMLDivElement>) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    const handleDelete = (event: MouseEvent) => {
      if (event.button === 0) {
        onDelete(item.id);
      }
    };

    return (
      <div
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
        <button onMouseDown={handleDelete} className="bg-red-500 text-white px-5 py-1 rounded">Delete</button>
      </div>
    );
  }
);

export default Item;

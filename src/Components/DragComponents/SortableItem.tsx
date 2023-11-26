// SortableItem.tsx

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HTMLAttributes } from "react";
import { Todo } from "../TestAddText";
import Item from "./Item";

type Props = {
  item: Todo;
  onDelete: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, onDelete, ...props }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });

  const styles: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      item={item}
      onDelete={onDelete}
      isDragging={isDragging} 
      style={styles}
      ref={setNodeRef}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;

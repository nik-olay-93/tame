"use client";

import { Tag } from "@prisma/client";
import CustomIcon from "components/ui/CustomIcon";
import { useRouter } from "next/navigation";
import { PlainObject } from "utils/plainTypes";
import removeTaskTag from "./api/removeTag";

export interface CardAddTagProps {
  taskId: string;
  tag: PlainObject<Tag>;
  isIssuer: boolean;
}

/**
 * ### Description
 *
 * Simple tag chip for displaying and removing tags from a task
 *
 * ### Props
 *
 * - `taskId` - The id of the task
 * - `tag` - The tag
 * - `isIssuer` - Whether the user can create tags
 *
 * ### Usage
 *
 * ```tsx
 * <CardAddChip taskId={id} tag={tag} isIssuer={canCreate} />
 * ```
 */
export default function CardTagChip({
  taskId,
  tag,
  isIssuer,
}: CardAddTagProps) {
  const router = useRouter();

  return (
    <div
      key={tag.id}
      className="text-sm px-2 py-1 text-gray-400 bg-primary-light dark:bg-[#424242] rounded-full flex flex-row items-center gap-1"
      onClick={async () => {
        if (!isIssuer) return;

        await removeTaskTag(taskId, tag.id);
        router.refresh();
      }}
    >
      {tag.name}
      {isIssuer && <CustomIcon icon="fluent:dismiss-20-regular" />}
    </div>
  );
}

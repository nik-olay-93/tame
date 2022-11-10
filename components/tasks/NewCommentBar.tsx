"use client";

import CustomIcon from "components/ui/CustomIcon";
import Search from "components/ui/forms/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import mutate from "utils/mutate";
import commentTask from "./api/comment";

export interface NewCommentProps {
  taskId: string;
  className?: string;
}

export default function NewComment({ className, taskId }: NewCommentProps) {
  const [text, setText] = useState("");

  const router = useRouter();

  return (
    <div className={`flex flex-row gap-2 ${className}`}>
      <Search
        placeholder="Comment"
        icon={{
          icon: "fluent:comment-add-20-regular",
          fontSize: "30px",
        }}
        className="flex-grow"
        value={text}
        onChange={(v) => setText(v)}
      />
      <div className="rounded-md p-2 bg-accent-light dark:bg-accent-dark">
        <CustomIcon
          icon="fluent:send-20-regular"
          fontSize="30px"
          onClick={() => {
            mutate(commentTask(taskId, text), router.refresh);
            setText("");
          }}
        />
      </div>
    </div>
  );
}

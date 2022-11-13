export default function changeTaskAssignee(id: string, userId?: string) {
  return fetch(`/api/task/${id}/changeAssignee`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  });
}

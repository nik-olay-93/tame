export default function changeTaskDescription(id: string, description: string) {
  return fetch(`/api/task/${id}/changeDescription`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      description,
    }),
  });
}

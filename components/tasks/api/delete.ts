export default function deleteTask(id: string) {
  return fetch(`/api/task/${id}/delete`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

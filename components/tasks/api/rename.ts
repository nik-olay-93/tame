export default function renameTask(id: string, name: string) {
  return fetch(`/api/task/${id}/rename`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
}

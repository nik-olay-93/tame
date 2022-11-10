export default function commentTask(id: string, text: string) {
  return fetch(`/api/task/${id}/comment`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text,
    }),
  });
}

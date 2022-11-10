export default function completeTask(id: string, complete = true) {
  return fetch(`/api/task/${id}/complete`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      complete,
    }),
  });
}

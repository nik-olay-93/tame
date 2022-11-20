export default function hideTask(id: string, hide = true) {
  return fetch(`/api/task/${id}/hide`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      hide,
    }),
  });
}

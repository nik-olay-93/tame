export default function addTaskTag(id: string, tagId: string) {
  return fetch(`/api/task/${id}/addTag`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      tagId,
    }),
  });
}

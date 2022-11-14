export default function removeTaskTag(id: string, tagId: string) {
  return fetch(`/api/task/${id}/removeTag`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      tagId,
    }),
  });
}

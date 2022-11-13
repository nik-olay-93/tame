export default function createTag(id: string, name: string) {
  return fetch(`/api/project/${id}/createTag`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
}

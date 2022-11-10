export default function mutate(data: Promise<Response>, refresh: () => void) {
  data.then(() => refresh()).catch((e) => console.log(e));
}

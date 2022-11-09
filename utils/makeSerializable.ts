export default function makeSerializable<T, V>(obj: T): V {
  return JSON.parse(JSON.stringify(obj));
}

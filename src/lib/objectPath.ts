// Minimal dot/bracket path get-set for plain JSON objects, used by the
// inline page-builder to patch one field inside a section's content blob
// (e.g. "stats[2].label") without touching the rest of it.

function parsePath(path: string): (string | number)[] {
  const parts = path.match(/[^.[\]]+/g) ?? [];
  return parts.map((p) => (/^\d+$/.test(p) ? Number(p) : p));
}

export function getPath(obj: unknown, path: string): unknown {
  return parsePath(path).reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;
    return (acc as Record<string | number, unknown>)[key];
  }, obj);
}

export function setPath<T>(obj: T, path: string, value: unknown): T {
  const parts = parsePath(path);
  const clone = structuredClone(obj) as Record<string | number, unknown>;
  let cursor: Record<string | number, unknown> = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    cursor = cursor[parts[i]] as Record<string | number, unknown>;
  }
  cursor[parts[parts.length - 1]] = value;
  return clone as T;
}

export function removeAtPath<T>(obj: T, arrayPath: string, index: number): T {
  const arr = getPath(obj, arrayPath);
  if (!Array.isArray(arr)) return obj;
  return setPath(
    obj,
    arrayPath,
    arr.filter((_, i) => i !== index)
  );
}

export function addAtPath<T>(obj: T, arrayPath: string, item: unknown): T {
  const arr = getPath(obj, arrayPath);
  return setPath(obj, arrayPath, Array.isArray(arr) ? [...arr, item] : [item]);
}

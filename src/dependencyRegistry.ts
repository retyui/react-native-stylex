const registry: Record<string, () => any> = {};

export const addDependency = (name: string, hook: () => any) => {
  if (!registry[name]) {
    Object.defineProperty(registry, name, { value: hook, writable: false });
  }
};

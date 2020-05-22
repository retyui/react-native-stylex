type SubscribeFn = (handler: () => void) => () => void;

const registry: Record<string, SubscribeFn> = {};

export const addDependency = (name: string, onChange: SubscribeFn) => {
  if (!registry[name]) {
    Object.defineProperty(registry, name, {
      value: onChange,
      writable: false,
    });
  }
};

export const getDependency = (name: string): SubscribeFn | undefined =>
  registry[name];

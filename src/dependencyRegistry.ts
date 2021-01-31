type UnSubscribeFn = () => void;
type SubscribeFn = (handler: () => void) => UnSubscribeFn;

interface Registry {
  [dependencyName: string]: SubscribeFn;
}

const registry: Registry = {};

export function addDependency(name: string, onChange: SubscribeFn): void {
  if (!registry[name]) {
    Object.defineProperty(registry, name, {
      value: onChange,
      writable: false,
    });
  }
}

export function getDependency(name: string): SubscribeFn | undefined {
  return registry[name];
}

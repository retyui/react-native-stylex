interface UsingSpec {
  [dependencyName: string]: boolean;
}

interface Ref {
  current: UsingSpec;
}

const ref: Ref = { current: {} };

export function resetUsing(): void {
  ref.current = {};
}

export function getUsing(): UsingSpec {
  return { ...ref.current };
}

export function onUse(name: string): void {
  ref.current[name] = true;
}

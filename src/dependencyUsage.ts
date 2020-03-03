const ref: { current: Record<string, boolean> } = { current: {} };

export const resetUsing = () => {
  ref.current = {};
};

export const getUsing = () => ({ ...ref.current });

export const onUse = (name: string) => {
  ref.current[name] = true;
};

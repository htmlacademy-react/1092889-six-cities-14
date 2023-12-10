const debounce = (callback: (args: string) => void, timeoutDelay?: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (rest: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(rest), timeoutDelay);
  };
};

export {debounce};

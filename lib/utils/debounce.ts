export function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
  
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(null, args);
      }, wait);
    };
  }
  
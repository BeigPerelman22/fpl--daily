import { useState } from "react";

export function useImageFallback(primary: string, fallback: string) {
  const [src, setSrc] = useState(primary);
  const onError = () => setSrc(fallback);
  return { src, onError };
}

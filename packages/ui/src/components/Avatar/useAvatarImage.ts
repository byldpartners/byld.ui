import { useState, useCallback } from "react";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

interface UseAvatarImageProps {
  src?: string;
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export function useAvatarImage({ src, onLoadingStatusChange }: UseAvatarImageProps = {}) {
  const [status, setStatus] = useState<ImageLoadingStatus>(src ? "idle" : "error");

  const onLoadStart = useCallback(() => {
    setStatus("loading");
    onLoadingStatusChange?.("loading");
  }, [onLoadingStatusChange]);

  const onLoad = useCallback(() => {
    setStatus("loaded");
    onLoadingStatusChange?.("loaded");
  }, [onLoadingStatusChange]);

  const onError = useCallback(() => {
    setStatus("error");
    onLoadingStatusChange?.("error");
  }, [onLoadingStatusChange]);

  const showImage = !!src && status !== "error";

  return { status, showImage, onLoadStart, onLoad, onError };
}

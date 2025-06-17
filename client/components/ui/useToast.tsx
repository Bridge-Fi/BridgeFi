import React from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";

type ToastOptions = {
  title: string;
  description?: string;
  type?: "success" | "error" | "loading";
  duration?: number;
};

export function useToast() {
  const notify = useCallback((options: ToastOptions) => {
    const { title, description, type = "success", duration = 4000 } = options;
    const content = (
      <div>
        <strong>{title}</strong>
        {description && <div>{description}</div>}
      </div>
    );

    if (type === "success") {
      toast.success(content, { duration });
    } else if (type === "error") {
      toast.error(content, { duration });
    } else if (type === "loading") {
      toast.loading(content, { duration });
    }
  }, []);

  return { toast: notify };
}

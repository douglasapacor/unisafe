"use client";

import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useEffect } from "react";

const defaultOptions = {
  type: "info",
  duration: 5000,
};

type AutoDismissAlertProps = {
  open: boolean;
  onClose?: () => void;
  text: string;
  header: string;
  options?: {
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
  };
};

const colors = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

export function AutoDismissAlert({
  text,
  header,
  open,
  onClose,
  options,
}: AutoDismissAlertProps) {
  const finalOpt = {
    ...defaultOptions,
    ...options,
  };

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, finalOpt.duration);

    return () => clearTimeout(timer);
  }, [open, finalOpt.duration, onClose]);

  if (!open) return null;

  return (
    <div className="absolute top-4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
      <Alert className="animate-in fade-in slide-in-from-top-2">
        {finalOpt.type === "success" && (
          <CheckCircle2Icon className="h-5 w-5 stroke-green-500" />
        )}

        {finalOpt.type === "error" && (
          <CheckCircle2Icon className="h-5 w-5 stroke-red-500" />
        )}

        {finalOpt.type === "warning" && (
          <CheckCircle2Icon className="h-5 w-5 stroke-amber-500" />
        )}

        {finalOpt.type === "info" && (
          <CheckCircle2Icon className="h-5 w-5 stroke-blue-500" />
        )}

        <AlertTitle
          className={`${colors[finalOpt.type! as keyof typeof colors]}`}
        >
          {header}
        </AlertTitle>
        <AlertDescription
          className={`${colors[finalOpt.type! as keyof typeof colors]}`}
        >
          {text}
        </AlertDescription>
      </Alert>
    </div>
  );
}

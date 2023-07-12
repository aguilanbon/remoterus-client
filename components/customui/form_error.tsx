"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const errorText = (text: String) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

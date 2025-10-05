"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import type * as React from "react";
import { getQueryClient } from "@/lib/qc";

export function Providers(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

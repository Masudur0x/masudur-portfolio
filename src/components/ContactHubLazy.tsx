"use client";

import dynamic from "next/dynamic";

export const ContactHubLazy = dynamic(
  () => import("./ContactHub").then((m) => m.ContactHub),
  { ssr: false }
);

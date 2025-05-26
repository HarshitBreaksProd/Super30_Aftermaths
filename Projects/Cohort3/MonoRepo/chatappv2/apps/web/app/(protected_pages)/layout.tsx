import React from "react";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
    return;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </>
  );
}

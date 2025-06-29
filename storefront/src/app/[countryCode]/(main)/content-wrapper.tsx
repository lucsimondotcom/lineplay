"use client"

import { usePathname } from "next/navigation"

interface ContentWrapperProps {
  children: React.ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const pathname = usePathname()
  const isHomepage = pathname === "/" || pathname.split("/").length === 2

  return (
    <div className={isHomepage ? "" : "pt-16 lg:pt-24"}>
      {children}
    </div>
  )
}

export default ContentWrapper 
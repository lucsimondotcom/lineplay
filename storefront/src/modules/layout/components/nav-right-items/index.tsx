"use client"

import { Suspense, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "../cart-button"
import CountrySelectNav from "../country-select-nav"
import { HttpTypes } from "@medusajs/types"

interface NavRightItemsProps {
  regions: HttpTypes.StoreRegion[]
}

const NavRightItems = ({ regions }: NavRightItemsProps) => {
  const pathname = usePathname()
  const isHomepage = pathname === "/" || pathname.split("/").length === 2
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!isHomepage) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomepage])

  const textColorClass = isHomepage && !isScrolled ? "text-white" : "text-black"

  return (
    <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
      <div className="hidden small:flex items-center gap-x-6 h-full">
        {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
          <LocalizedClientLink
            className={`hover:text-ui-fg-base transition-colors duration-300 ${textColorClass}`}
            href="/search"
            scroll={false}
            data-testid="nav-search-link"
          >
            Search
          </LocalizedClientLink>
        )}
        <LocalizedClientLink
          className={`hover:text-ui-fg-base transition-colors duration-300 ${textColorClass}`}
          href="/account"
          data-testid="nav-account-link"
        >
          Account
        </LocalizedClientLink>
      </div>
      <Suspense
        fallback={
          <LocalizedClientLink
            className={`hover:text-ui-fg-base flex gap-2 transition-colors duration-300 ${textColorClass}`}
            href="/cart"
            data-testid="nav-cart-link"
          >
            Cart (0)
          </LocalizedClientLink>
        }
      >
        <CartButton textColorClass={textColorClass} />
      </Suspense>
      <CountrySelectNav regions={regions} textColorClass={textColorClass} />
    </div>
  )
}

export default NavRightItems 
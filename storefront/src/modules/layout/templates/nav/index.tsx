import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import SideMenu from "@modules/layout/components/side-menu"
import NavRightItems from "@modules/layout/components/nav-right-items"
import InteractiveHeader from "./interactive-header"
import Logo from "./logo"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <InteractiveHeader>
      <header className="relative h-24 w-full">
        <nav className="px-6 lg:px-24 text-xs flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <Logo />
          </div>
          
          <NavRightItems regions={regions} />
        </nav>
      </header>
    </InteractiveHeader>
  )
}

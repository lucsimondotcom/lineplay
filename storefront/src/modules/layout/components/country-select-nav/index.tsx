"use client"

import { useToggleState } from "@medusajs/ui"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

type CountrySelectNavProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountrySelectNav = ({ regions }: CountrySelectNavProps) => {
  const toggleState = useToggleState()

  return (
    <div className="hidden small:block">
      <CountrySelect regions={regions} toggleState={toggleState} />
    </div>
  )
}

export default CountrySelectNav 
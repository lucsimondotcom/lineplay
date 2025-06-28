"use client"

import { useToggleState } from "@medusajs/ui"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

type CountrySelectNavProps = {
  regions: HttpTypes.StoreRegion[]
  textColorClass?: string
}

const CountrySelectNav = ({ regions, textColorClass }: CountrySelectNavProps) => {
  const toggleState = useToggleState()

  return (
    <div className="hidden small:block">
      <CountrySelect regions={regions} toggleState={toggleState} textColorClass={textColorClass} />
    </div>
  )
}

export default CountrySelectNav 
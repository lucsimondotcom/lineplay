"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState, useRef } from "react"
import ReactCountryFlag from "react-country-flag"

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const { state, open, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close()
      }
    }

    if (state) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [state, close])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
    close()
  }

  return (
    <div ref={containerRef}>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o?.country === countryCode)
            : undefined
        }
      >
        {({ open: listboxOpen }) => (
          <>
            <Listbox.Button 
              className="py-1 w-full hover:text-ui-fg-base"
              onClick={() => {
                if (listboxOpen) {
                  close()
                } else {
                  open()
                }
              }}
            >
              <div className="txt-compact-small flex items-center gap-x-2">
                {current && (
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "14px",
                      height: "14px",
                    }}
                    countryCode={current.country ?? ""}
                  />
                )}
                {current ? current.label : "Select country"}
              </div>
            </Listbox.Button>
            <div className="flex relative w-full min-w-[200px]">
              <Transition
                show={state}
                as={Fragment}
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute top-full left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular text-black no-scrollbar rounded-rounded w-full mt-1"
                  static
                >
                  {options?.map((o, index) => {
                    return (
                      <Listbox.Option
                        key={index}
                        value={o}
                        className="py-2 px-3 cursor-pointer hover:bg-gray-100 flex items-center gap-x-2"
                      >
                        <ReactCountryFlag
                          svg
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                          countryCode={o?.country ?? ""}
                        />
                        {o?.label}
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default CountrySelect

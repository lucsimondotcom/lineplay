import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

// Custom order for size options
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const sortSizeOptions = (options: string[]) => {
  return options.sort((a, b) => {
    const aIndex = SIZE_ORDER.indexOf(a.toUpperCase())
    const bIndex = SIZE_ORDER.indexOf(b.toUpperCase())
    
    // If both are in the custom order, sort by their position
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }
    
    // If only one is in the custom order, prioritize it
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    
    // If neither is in the custom order, maintain original order
    return 0
  })
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = option.values?.map((v) => v.value)
  
  // Apply custom sorting for size options
  const sortedOptions = React.useMemo(() => {
    if (!filteredOptions) return []
    
    // Check if this is a size option (case insensitive)
    const isSizeOption = title.toLowerCase().includes('size') || 
                        title.toLowerCase().includes('taille') ||
                        title.toLowerCase().includes('größe')
    
    if (isSizeOption) {
      return sortSizeOptions([...filteredOptions])
    }
    
    return filteredOptions
  }, [filteredOptions, title])

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-xs uppercase">{title}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {sortedOptions?.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.title ?? "", v ?? "")}
              key={v}
              className={clx(
                "border-ui-border-base border text-small-regular h-10 p-2 flex-1 ",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect

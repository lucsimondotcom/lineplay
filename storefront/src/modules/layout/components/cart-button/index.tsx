"use client"

import { useEffect, useState } from "react"
import CartDropdown from "../cart-dropdown"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

interface CartButtonProps {
  textColorClass?: string
}

export default function CartButton({ textColorClass }: CartButtonProps) {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart()
        if (cartData?.items?.length) {
          const enrichedItems = await enrichLineItems(cartData.items, cartData.region_id!)
          cartData.items = enrichedItems
        }
        setCart(cartData)
      } catch (error) {
        console.error("Error fetching cart:", error)
      }
    }

    fetchCart()
  }, [])

  return <CartDropdown cart={cart} textColorClass={textColorClass} />
}

import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import LenisProvider from "../components/LenisProvider"
import GoogleAnalytics from "../components/GoogleAnalytics"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <GoogleAnalytics />
        <LenisProvider>
          <main className="relative">{props.children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}

import { Text } from "@medusajs/ui"

import Instagram from "../../../common/icons/instagram"
import Facebook from "../../../common/icons/facebook"
import YouTube from "../../../common/icons/youtube"
import LinkedIn from "../../../common/icons/linkedin"

const MedusaCTA = () => {
  return (
    <div className="flex gap-x-4 items-center">
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noreferrer"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Follow us on Instagram"
      >
        <Instagram size="20" />
      </a>
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noreferrer"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Follow us on Facebook"
      >
        <Facebook size="20" />
      </a>
      <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noreferrer"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Follow us on YouTube"
      >
        <YouTube size="20" />
      </a>
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noreferrer"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Follow us on LinkedIn"
      >
        <LinkedIn size="20" />
      </a>
    </div>
  )
}

export default MedusaCTA

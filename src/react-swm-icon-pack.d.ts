declare module 'react-swm-icon-pack' {
  import type { ComponentType, SVGProps } from 'react'

  type IconProps = SVGProps<SVGSVGElement> & {
    color?: string
    set?: string
    size?: string | number
  }

  export const ChevronDown: ComponentType<IconProps>
  export const ChevronRight: ComponentType<IconProps>
  export const Home1: ComponentType<IconProps>
  export const Mail: ComponentType<IconProps>
}

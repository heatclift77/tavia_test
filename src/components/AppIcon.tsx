import { Icon, IconProps } from "@iconify/react"

function AppIcon({ icon, ...rest }: IconProps) {
  return <Icon icon={icon} {...rest} />
}

export default AppIcon

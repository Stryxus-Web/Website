import "./UtilityElements.sass";

import * as icons from "react-bootstrap-icons";

export interface IconProps extends icons.IconProps {
    iconName: keyof typeof icons;
}

export const Icon = ({ iconName, ...props }: IconProps) => {
    const BootstrapIcon = icons[iconName];
    return <BootstrapIcon {...props} />;
}
import React from "react";

export default interface TemplateProps extends Omit<{}, 'variant'> {
    // Props Here
    children: React.ReactNode
}

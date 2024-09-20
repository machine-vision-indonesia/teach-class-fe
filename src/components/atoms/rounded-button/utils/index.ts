/**
 * A function that returns an icon size based on the provided size parameter.
 *
 * @param {string} size - The size parameter to determine the icon size.
 * @return {number} The icon size based on the provided size parameter.
 */
export const getSize = (size: string) => {
    switch (size) {
        case 'small':
            return 16;
        case 'large':
            return 24;
        default:
            return 20;
    }
};

export const getButtonSize = (size: string) => {
    switch (size) {
        case 'small':
            return 28;
        case 'large':
            return 48;
        default:
            return 36;
    }
};
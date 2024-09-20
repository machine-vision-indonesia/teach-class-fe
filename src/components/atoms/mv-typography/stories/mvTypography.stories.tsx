import type { Meta, StoryObj } from '@storybook/react';
import MvTypography from '../components/MvTypography';
import { SIZE_VARIANT } from '../constants/size';
import MvTypographyProps from '../types/mvTypography.types';

const meta: Meta<typeof MvTypography> = {
    title: 'Components/Atoms/MVTypography',
    component: MvTypography,
    argTypes: {
        typeSize: {
            control: {
                type: 'select',
                options: ['PX', 'DVW'],
            },
        },
        size: {
            control: {
                type: 'select',
                options: Object.keys(SIZE_VARIANT),
            },
        },
        children: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<MvTypographyProps>;

export const Default: Story = {
    args: {
        typeSize: 'PX',
        size: 'TITLE_MD',
        children: 'Sample Text',
    },
};

export const TableHeader: Story = {
    args: {
        typeSize: 'PX',
        size: 'TABLE_HEADER',
        children: 'Table Title',
    },
};

import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  docs: {},
  staticDirs: ['../public'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => {
        return prop.parent
          ? prop.parent.name !== 'DOMAttributes' &&
              prop.parent.name !== 'HTMLAttributes' &&
              prop.parent.name !== 'AriaAttributes'
          : true
      }
    },
    skipCompiler: true
  },
  previewHead: head => `
		${head}
		<script src='/__ENV.js' defer></script>
	`
}

export default config

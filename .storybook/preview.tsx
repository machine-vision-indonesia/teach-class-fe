import { queryClient } from '@/pages/_app'
import { roboto } from '@/utils/font'
import { CacheProvider } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { Controls, Description, Primary, Stories, Title } from '@storybook/blocks'
import type { Preview } from '@storybook/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import Connector from 'src/client/socket/Connector'
import { store } from 'src/store'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      )
    }
  },
  decorators: [
    Story => {
      const emotionCache = createEmotionCache()

      return (
        <>
          <style global jsx>{`
            :root {
              --font-roboto: ${roboto.style.fontFamily};
            }

            html {
              font-family: var(--font-roboto), system-ui, sans-serif;
            }
          `}</style>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Provider store={store}>
                <Connector>
                  <CacheProvider value={emotionCache}>
                    <SettingsProvider>
                      <SettingsConsumer>
                        {({ settings }) => {
                          return (
                            <ThemeComponent settings={settings}>
                              <Story />
                            </ThemeComponent>
                          )
                        }}
                      </SettingsConsumer>
                    </SettingsProvider>
                  </CacheProvider>
                </Connector>
              </Provider>
            </LocalizationProvider>
          </QueryClientProvider>
        </>
      )
    }
  ],
  tags: ['autodocs']
}

export default preview

// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { getLayout as getBaseLayout } from 'src/layouts/Layout'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

/**
 * clent import
 */
import Connector from 'src/client/socket/Connector'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { registerLicense } from '@syncfusion/ej2-base'
import { roboto } from 'src/utils/font'
import { setLocale } from 'yup'
import { titleCase } from 'src/utils/general'
import { loadIcons } from '@iconify/react'
import { env } from 'next-runtime-env'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst'
    },
    mutations: {
      networkMode: 'offlineFirst'
    }
  }
})

setLocale({
  // TODO: Add min 1 array required message
  mixed: {
    required(params) {
      const message = 'is a required field'
      if (params.label) {
        return `${params.label} ${message}`
      }

      let splittedLabel = []

      if (!params.path.match(/[\s_-]/g)) {
        splittedLabel = params.path.split(/(?=[A-Z])/)
      } else {
        splittedLabel = params.path.split('_')
      }

      return `${titleCase(splittedLabel.join(' '))} ${message}`
    }
  }
})

// TODO: Mungkin bisa ngecek env pakek zod
// TODO: Carik cara biar bisa register lisensi di server
registerLicense(env('NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY')!)

loadIcons(['ic:baseline-check', 'ic:baseline-do-disturb'])

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ??
    (page =>
      router.pathname === '/'
        ? getBaseLayout(page)
        : getBaseLayout(<UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>))

  const setConfig = Component.setConfig ?? undefined

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
        <Provider store={store}>
          <Connector>
            <CacheProvider value={emotionCache}>
              <Head>
                <title>{`${themeConfig.templateName}`}</title>
                <meta name='description' content={`${themeConfig.templateName}`} />
                <meta name='viewport' content='initial-scale=1, width=device-width' />
              </Head>
              <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                <SettingsConsumer>
                  {({ settings }) => {
                    return (
                      <ThemeComponent settings={settings}>
                        <WindowWrapper>{getLayout(<Component {...pageProps} />)}</WindowWrapper>
                        <ReactHotToast>
                          <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                        </ReactHotToast>
                      </ThemeComponent>
                    )
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            </CacheProvider>
          </Connector>
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App

import { store } from '@/features/store'
import { Provider } from 'react-redux'

import type { AppProps } from 'next/app'
import '@/styles/normal.scss'
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

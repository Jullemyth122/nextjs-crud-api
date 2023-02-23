import { store } from '@/features/store'
import Head from 'next/head'
import { Provider } from 'react-redux'
import Counter from './counter'

export default function Home() {
  return (
    <>
      <Head>
        <title> Next Functionality </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        {/* <Counter></Counter> */}
      </Provider>
    </>
  )
}
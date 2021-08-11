import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { KeypadDecimal } from '../components/KeypadDecimal'
import { Keypad0 } from '../components/Keypad0'
import { KeypadAdd } from '../components/KeypadAdd'
import { Keypad9 } from '../components/Keypad9'
import { Keypad8 } from '../components/Keypad8'
import { Keypad7 } from '../components/Keypad7'
import { Keypad6 } from '../components/Keypad6'
import { Keypad5 } from '../components/Keypad5'
import { Keypad4 } from '../components/Keypad4'
import { Keypad3 } from '../components/Keypad3'
import { Keypad2 } from '../components/Keypad2'
import { Keypad1 } from '../components/Keypad1'
import { KeypadEqual } from '../components/KeypadEqual'
import { Result } from '../components/Result'
import useResult from '../components/useResult'

export default function Home(): JSX.Element {
  const { addInput, calculate, result } = useResult()

  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Result value={result} />
        <Keypad1 />
        <Keypad2 onInput={addInput} />
        <Keypad3 />
        <Keypad4 onInput={addInput} />
        <Keypad5 />
        <Keypad6 />
        <Keypad7 />
        <Keypad8 />
        <Keypad9 />
        <Keypad0 />
        <KeypadDecimal />
        <KeypadAdd onInput={addInput} />
        <KeypadEqual onInput={calculate} />
      </main>
    </>
  )
}

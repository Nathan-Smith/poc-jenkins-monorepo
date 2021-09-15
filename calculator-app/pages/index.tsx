import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { KeypadDecimal } from '../components/KeypadDecimal'
import { KeypadDigit } from '../components/KeypadDigit'
import { KeypadAdd } from '../components/KeypadAdd'
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
        <KeypadDigit digit="1" onInput={addInput} />
        <KeypadDigit digit="2" onInput={addInput} />
        <KeypadDigit digit="3" onInput={addInput} />
        <KeypadDigit digit="4" onInput={addInput} />
        <KeypadDigit digit="5" onInput={addInput} />
        <KeypadDigit digit="6" onInput={addInput} />
        <KeypadDigit digit="7" onInput={addInput} />
        <KeypadDigit digit="8" onInput={addInput} />
        <KeypadDigit digit="9" onInput={addInput} />
        <KeypadDigit digit="0" onInput={addInput} />
        <KeypadDecimal />
        <KeypadAdd onInput={addInput} />
        <KeypadEqual onInput={calculate} />
      </main>
    </>
  )
}

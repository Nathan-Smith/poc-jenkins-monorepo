import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { KeypadButton } from '../components/KeypadButton'
import { KeypadEqual } from '../components/KeypadEqual'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.result}>42</div>
        <KeypadButton gridArea="keypad-1">1</KeypadButton>
        <KeypadButton gridArea="keypad-2">2</KeypadButton>
        <KeypadButton gridArea="keypad-3">3</KeypadButton>
        <KeypadButton gridArea="keypad-4">4</KeypadButton>
        <KeypadButton gridArea="keypad-5">5</KeypadButton>
        <KeypadButton gridArea="keypad-6">6</KeypadButton>
        <KeypadButton gridArea="keypad-7">7</KeypadButton>
        <KeypadButton gridArea="keypad-8">8</KeypadButton>
        <KeypadButton gridArea="keypad-9">9</KeypadButton>
        <KeypadButton gridArea="keypad-add">+</KeypadButton>
        <KeypadButton gridArea="keypad-0">0</KeypadButton>
        <KeypadButton gridArea="keypad-decimal">.</KeypadButton>
        <KeypadEqual />
      </main>
    </>
  )
}

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { KeypadButton } from '../components/KeypadButton'
import { KeypadEqual } from '../components/KeypadEqual'
import { useEffect, useRef } from 'react'
import { MDCTextField } from '@material/textfield'

export function Result(): JSX.Element {
  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    if (labelRef.current) new MDCTextField(labelRef.current)
  }, [labelRef])

  return (
    <label className={`mdc-text-field mdc-text-field--filled mdc-text-field--end-aligned ${styles.result}`} style={{gridArea: 'result'}} ref={labelRef}>
      <span className="mdc-text-field__ripple"></span>
      <input
        className="mdc-text-field__input"
        type="text"
        aria-labelledby="my-label-id"
      />
      <span className="mdc-line-ripple"></span>
    </label>
  )
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Result />
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

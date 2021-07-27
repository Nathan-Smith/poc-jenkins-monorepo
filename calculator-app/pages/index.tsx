import Head from 'next/head'
import styles from '../styles/Home.module.css'

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
        <div className={styles.keypad_1}>1</div>
        <div className={styles.keypad_2}>2</div>
        <div className={styles.keypad_3}>3</div>
        <div className={styles.keypad_4}>4</div>
        <div className={styles.keypad_5}>5</div>
        <div className={styles.keypad_6}>6</div>
        <div className={styles.keypad_7}>7</div>
        <div className={styles.keypad_8}>8</div>
        <div className={styles.keypad_9}>9</div>
        <div className={styles.keypadAdd}>+</div>
        <div className={styles.keypad_0}>0</div>
        <div className={styles.keypadDecimal}>.</div>
        <div className={styles.keypadEqual}>=</div>
      </main>

    </>
  )
}

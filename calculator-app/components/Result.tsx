import styles from '../styles/Home.module.scss'

export function Result({ value }: { value: string }): JSX.Element {
  return (
    <div data-testid="result" className={`result ${styles.result}`}>
      {value}
    </div>
  )
}

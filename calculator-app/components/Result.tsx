import styles from '../styles/Home.module.scss'
import { useEffect, useRef, useState } from 'react'
import { MDCTextField } from '@material/textfield'

export function Result(): JSX.Element {
  const labelRef = useRef<HTMLLabelElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (labelRef.current) new MDCTextField(labelRef.current)
  }, [labelRef])

  // Overkill number validation (/^(-?)(\d(?:\d{0,3}(?<!,),(?:\d{1,3})?)+|\d*)(?<=,\d{3}|[^,]?)((?:\.\d*))?.*/gm

  return (
    <label
      className={`mdc-text-field mdc-text-field--filled mdc-text-field--end-aligned ${styles.result}`}
      style={{ gridArea: 'result' }}
      ref={labelRef}
    >
      <span className="mdc-text-field__ripple"></span>
      <input
        data-testid="result-input"
        className={`mdc-text-field__input ${styles.resultInput}`}
        type="text"
        value={value}
        onChange={(e) => {
          const [sign = '', whole = '', decimal = '', fractional = ''] =
            e.target.value.match(/^(-?)(\d*)(\.\d*)?.*/gm) ?? []
          setValue(`${sign}${whole}${decimal}${fractional}`)
        }}
      />
      <span className="mdc-line-ripple"></span>
    </label>
  )
}

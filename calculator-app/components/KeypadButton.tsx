import { MDCRipple } from '@material/ripple'
import { useEffect, useRef } from 'react'

import styles from '../styles/Home.module.scss'

export enum MDCButtonVariant {
  outlined = 'outlined',
  raised = 'raised',
}

export function KeypadButton({
  children,
  gridArea,
  onClick,
  testid,
  variant = MDCButtonVariant.outlined,
}: {
  children: React.ReactNode
  gridArea: string
  onClick?: () => void
  testid: string
  variant?: MDCButtonVariant
}): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) new MDCRipple(buttonRef.current)
  }, [buttonRef])

  return (
    <button
      className={`mdc-button mdc-button--${variant} ${styles.keypadButton}`}
      data-testid={testid}
      onClick={() => { onClick?.() }}
      ref={buttonRef}
      style={{ gridArea: gridArea }}
    >
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__label">{children}</span>
    </button>
  )
}

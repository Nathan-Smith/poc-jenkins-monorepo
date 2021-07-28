import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.scss';
import { MDCRipple } from '@material/ripple';

export function KeypadEqual(): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current)
      new MDCRipple(buttonRef.current);
  }, [buttonRef]);

  return (
    <button
      className={`mdc-button mdc-button--raised ${styles.keypadButton} ${styles.keypadEqual}`}
      style={{ gridArea: 'keypad-equal', overflow: 'hidden' }}
      ref={buttonRef}
    >
      <span className="mdc-button__ripple" />
      <span className="mdc-button__label">=</span>
    </button>
  );
}

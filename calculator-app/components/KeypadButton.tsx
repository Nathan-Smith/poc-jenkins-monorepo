import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.scss';
import { MDCRipple } from '@material/ripple';

export function KeypadButton({
  gridArea, children,
}: {
  gridArea: string;
  children: React.ReactNode;
}): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current)
      new MDCRipple(buttonRef.current);
  }, [buttonRef]);

  return (
    <button
      className={`mdc-button mdc-button--outlined ${styles.keypadButton}`}
      style={{ gridArea: gridArea }}
      ref={buttonRef}
    >
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__label">{children}</span>
    </button>
  );
}

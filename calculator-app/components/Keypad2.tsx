import { KeypadButton } from './KeypadButton'

export function Keypad2({
  onClick,
}: {
  onClick?: (op: string) => void
}): JSX.Element {
  return (
    <KeypadButton
      testid="keypad-2"
      gridArea="keypad-2"
      onClick={() => {
        onClick?.('2')
      }}
    >
      2
    </KeypadButton>
  )
}

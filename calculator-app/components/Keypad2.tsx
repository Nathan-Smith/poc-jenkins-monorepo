import { KeypadButton } from './KeypadButton'

export function Keypad2({
  onInput,
}: {
  onInput?: (op: string) => void
}): JSX.Element {
  return (
    <KeypadButton
      testid="keypad-2"
      gridArea="keypad-2"
      onClick={() => {
        onInput?.('2')
      }}
    >
      2
    </KeypadButton>
  )
}

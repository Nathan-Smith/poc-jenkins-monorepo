import { KeypadButton } from './KeypadButton'

export function Keypad4({
  onInput,
}: {
  onInput?: (op: string) => void
}): JSX.Element {
  return (
    <KeypadButton
      testid="keypad-4"
      gridArea="keypad-4"
      onClick={() => {
        onInput?.('4')
      }}
    >
      4
    </KeypadButton>
  )
}

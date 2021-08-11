import { KeypadButton } from './KeypadButton'

export function KeypadAdd({
  onInput,
}: {
  onInput?: (op: string) => void
}): JSX.Element {
  return (
    <KeypadButton
      testid="keypad-add"
      gridArea="keypad-add"
      onClick={() => {
        onInput?.('add')
      }}
    >
      +
    </KeypadButton>
  )
}

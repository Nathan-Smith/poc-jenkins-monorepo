import { KeypadButton } from './KeypadButton'

export function KeypadEqual({
  onInput,
}: {
  onInput?: () => void
}): JSX.Element {
  return (
    <KeypadButton
      testid="keypad-equal"
      gridArea="keypad-equal"
      onClick={() => {
        onInput?.()
      }}
    >
      =
    </KeypadButton>
  )
}

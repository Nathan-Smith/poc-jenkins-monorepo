import { KeypadButton } from './KeypadButton'

export function KeypadDigit({
  digit,
  onInput,
}: {
  digit: string
  onInput?: (op: string) => void
}): JSX.Element {
  return (
    <KeypadButton
      testid={`keypad-${digit}`}
      gridArea={`keypad-${digit}}`}
      onClick={() => {
        onInput?.(digit)
      }}
    >
      {digit}
    </KeypadButton>
  )
}

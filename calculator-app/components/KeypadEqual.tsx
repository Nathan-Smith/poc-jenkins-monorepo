import { KeypadButton, MDCButtonVariant } from './KeypadButton'

export function KeypadEqual(): JSX.Element {
  return (
    <KeypadButton
      testid="keypad-equal"
      gridArea="keypad-equal"
      variant={MDCButtonVariant.raised}
    >
      =
    </KeypadButton>
  )
}

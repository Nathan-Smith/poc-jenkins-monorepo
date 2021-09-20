package bdd.addition

import net.serenitybdd.screenplay.Task
import net.serenitybdd.screenplay.actions.Click

object EnterOnTheKeypad {

  data class DigitButton(val button: Task)

  fun the(digit: Int) = DigitButton(button = Task.where(
    "{0} enter $digit on the keypad",
    Click.on(when (digit) {
      0 -> Keypad.BUTTON_0
      1 -> Keypad.BUTTON_1
      2 -> Keypad.BUTTON_2
      3 -> Keypad.BUTTON_3
      4 -> Keypad.BUTTON_4
      5 -> Keypad.BUTTON_5
      6 -> Keypad.BUTTON_6
      7 -> Keypad.BUTTON_7
      8 -> Keypad.BUTTON_8
      9 -> Keypad.BUTTON_9
      else -> Keypad.BUTTON_0
    })
  ))

  val theAddButton: Task = Task.where(
    "{0} enter add on the keypad",
    Click.on(Keypad.BUTTON_ADD)
  )

  val theEqualButton = Task.where(
    "{0} enter equal on the keypad",
    Click.on(Keypad.BUTTON_EQUAL)
  )
}

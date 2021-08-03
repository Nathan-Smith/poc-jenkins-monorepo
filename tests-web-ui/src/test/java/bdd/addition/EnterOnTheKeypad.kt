package bdd.addition

import net.serenitybdd.screenplay.Task
import net.serenitybdd.screenplay.actions.Click

object EnterOnTheKeypad {
  val the2Button: Task = Task.where(
    "{0} enters 2 on the keypad",
    Click.on(Keypad.BUTTON_2)
  )

  val the4Button: Task = Task.where(
    "{0} enters 4 on the keypad",
    Click.on(Keypad.BUTTON_4)
  )

  val theAddButton: Task = Task.where(
    "{0} enters add on the keypad",
    Click.on(Keypad.BUTTON_ADD)
  )

  val theEqualButton = Task.where(
    "{0} enters equal on the keypad",
    Click.on(Keypad.BUTTON_EQUAL)
  )
}

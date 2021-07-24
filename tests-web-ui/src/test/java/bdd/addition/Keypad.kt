package bdd.addition

import net.serenitybdd.screenplay.targets.Target

object Keypad {
  val BUTTON_ADD: Target = Target.the("keypad button")
    .locatedBy("#keypad-add")

  val BUTTON_4: Target = Target.the("keypad button")
    .locatedBy("#keypad-4")

  val BUTTON_2: Target = Target.the("keypad button")
    .locatedBy("#keypad-2")
}

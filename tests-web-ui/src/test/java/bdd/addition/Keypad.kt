package bdd.addition

import net.serenitybdd.screenplay.targets.Target

object Keypad {
  val BUTTON_ADD: Target = Target.the("keypad button")
    .locatedBy("[data-testid='keypad-add']")

  val BUTTON_4: Target = Target.the("keypad button")
    .locatedBy("[data-testid='keypad-4']")

  val BUTTON_2: Target = Target.the("keypad button")
    .locatedBy("[data-testid='keypad-2']")
}

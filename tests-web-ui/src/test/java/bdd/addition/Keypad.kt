package bdd.addition

import net.serenitybdd.screenplay.targets.Target

object Keypad {
  val BUTTON_ADD: Target = Target.the("keypad add")
    .locatedBy("[data-testid='keypad-add']")

  val BUTTON_EQUAL: Target = Target.the("keypad equal")
    .locatedBy("[data-testid='keypad-equal']")

  val BUTTON_4: Target = Target.the("keypad 4")
    .locatedBy("[data-testid='keypad-4']")

  val BUTTON_2: Target = Target.the("keypad 2")
    .locatedBy("[data-testid='keypad-2']")
}

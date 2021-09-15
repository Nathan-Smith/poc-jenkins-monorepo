package bdd.addition

import net.serenitybdd.screenplay.targets.Target

object Keypad {
  val BUTTON_ADD: Target = Target.the("keypad add")
    .locatedBy("[data-testid='keypad-add']")

  val BUTTON_EQUAL: Target = Target.the("keypad equal")
    .locatedBy("[data-testid='keypad-equal']")

  val BUTTON_0: Target = Target.the("keypad 0")
    .locatedBy("[data-testid='keypad-0']")

  val BUTTON_1: Target = Target.the("keypad 1")
    .locatedBy("[data-testid='keypad-1']")

  val BUTTON_2: Target = Target.the("keypad 2")
    .locatedBy("[data-testid='keypad-2']")

  val BUTTON_3: Target = Target.the("keypad 3")
    .locatedBy("[data-testid='keypad-3']")

  val BUTTON_4: Target = Target.the("keypad 4")
    .locatedBy("[data-testid='keypad-4']")

  val BUTTON_5: Target = Target.the("keypad 5")
    .locatedBy("[data-testid='keypad-5']")

  val BUTTON_6: Target = Target.the("keypad 6")
    .locatedBy("[data-testid='keypad-6']")

  val BUTTON_7: Target = Target.the("keypad 7")
    .locatedBy("[data-testid='keypad-7']")

  val BUTTON_8: Target = Target.the("keypad 8")
    .locatedBy("[data-testid='keypad-8']")

  val BUTTON_9: Target = Target.the("keypad 9")
    .locatedBy("[data-testid='keypad-9']")
}

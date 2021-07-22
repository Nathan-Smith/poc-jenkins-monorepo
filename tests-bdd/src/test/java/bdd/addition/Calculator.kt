package bdd.addition

import net.serenitybdd.screenplay.targets.Target

object Calculator {
  val RESULT: Target = Target.the("calculator result").locatedBy("#calculator-result")
}

package bdd.navigation

import net.serenitybdd.screenplay.Performable
import net.serenitybdd.screenplay.Task
import net.serenitybdd.screenplay.actions.Open

object NavigateTo {
  val theCalculatorPage: Performable = Task.where(
    "{0} opens the Calculator page",
    Open.browserOn().the(CalculatorHomePage::class.java)
  )
}

package bdd.navigation

import net.serenitybdd.screenplay.Performable
import net.serenitybdd.screenplay.Task
import net.serenitybdd.screenplay.actions.Open

object NavigateTo {
  fun theWikipediaHomePage(): Performable {
    return Task.where(
      "{0} opens the Wikipedia home page",
      Open.browserOn().the(WikipediaHomePage::class.java)
    )
  }
}
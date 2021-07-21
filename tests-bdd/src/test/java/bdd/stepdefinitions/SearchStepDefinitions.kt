package bdd.stepdefinitions

import bdd.navigation.NavigateTo
import bdd.search.LookForInformation
import bdd.search.WikipediaArticle
import io.cucumber.java.en.Given
import io.cucumber.java.en.Then
import io.cucumber.java.en.When
import net.serenitybdd.screenplay.Actor
import net.serenitybdd.screenplay.ensure.that

class SearchStepDefinitions {
  @Given("{actor} is researching things on the internet")
  fun researchingThings(actor: Actor) {
    actor.wasAbleTo(NavigateTo.theWikipediaHomePage())
  }

  @When("{actor} looks up {string}")
  fun searchesFor(actor: Actor, term: String) {
    actor.attemptsTo(
      LookForInformation.about(term)
    )
  }

  @Then("{actor} should see information about {string}")
  fun should_see_information_about(actor: Actor, term: String?) {
    actor.attemptsTo(
      that(WikipediaArticle.HEADING).hasText(term!!)
    )
  }
}
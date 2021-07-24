package bdd.stepdefinitions

import io.cucumber.java.Before
import io.cucumber.java.ParameterType
import net.serenitybdd.screenplay.Actor
import net.serenitybdd.screenplay.actors.OnStage
import net.serenitybdd.screenplay.actors.OnlineCast

class ParameterDefinitions {
  @ParameterType(".*")
  fun actor(actorName: String?): Actor {
    return OnStage.theActorCalled(actorName)
  }

  @Before
  fun setTheStage() {
    OnStage.setTheStage(OnlineCast())
  }
}
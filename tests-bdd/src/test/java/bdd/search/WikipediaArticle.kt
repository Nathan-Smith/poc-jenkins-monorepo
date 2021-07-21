package bdd.search

import net.serenitybdd.screenplay.targets.Target

object WikipediaArticle {
  val HEADING = Target.the("article heading").locatedBy("#firstHeading")
}
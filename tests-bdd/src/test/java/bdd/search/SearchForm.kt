package bdd.search

import net.serenitybdd.screenplay.targets.Target

internal object SearchForm {
  var SEARCH_FIELD = Target.the("search field")
    .locatedBy("#searchInput")
}
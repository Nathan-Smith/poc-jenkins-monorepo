
create:
	docker-compose run --rm mvn make _create

_create:
	mvn -U archetype:generate -Dfilter="io.jenkins.archetypes:"

mvn-%:
	docker-compose run --rm mvn make _mvn-$*

_mvn-%:
	mvn $*
	
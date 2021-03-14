import org.jgrapht.graph.*

void stageFactory(String name) {
    node {
        stage(name) {
            checkout(scm)
            dir(name) {
                sh "make ci"
            }
        }
    }
}

node {
    checkout(scm)

    def graph = findFiles()
        .findAll { it.directory }
        .findAll { fileExists("${it.name}/Makefile") }
        .findAll { fileExists("${it.name}/deps") }
        .collectEntries { [(it.name) : readFile("${it.name}/deps").split('\n')] } // Create a Map of component to dependencies
        .inject(
            new DefaultDirectedGraph<String>(DefaultEdge.class).with {
                it.addVertex(".")
                it
            }
        ) { graph, component ->
            graph.addVertex(component.key)
            graph.addEdge(".", component.key)

            component.value.each { dep ->
                graph.addVertex(dep)
                graph.addEdge(component.key, dep)
            }

            graph
        }

    while(graph.vertexSet().size() > 1) {
        def stages = graph.vertexSet().findResults { node ->
            if (graph.outgoingEdgesOf(node).size() == 0) {
                return node
            }
        }

        if (stages.size() > 1) {
            parallel stages.collectEntries {
                [it, { stageFactory(it) }]
            }
        } else {
            stageFactory(stages[0])
        }

        stages.each {
            graph.removeVertex(it)
        }
    }
}
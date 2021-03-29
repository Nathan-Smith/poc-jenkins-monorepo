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

    def graph = findFiles()                                                     // Only traverses to top-level directory for components
        .findAll { it.directory }
        .findAll { fileExists("${it.name}/Makefile") }
        .findAll { fileExists("${it.name}/deps") }
        .collectEntries {                                                       // Create a Map of component to dependencies
            [(it.name) : readFile("${it.name}/deps").split('\n')]               // deps file should be a list seperated by newline
        }
        .inject(new DefaultDirectedGraph<String>(DefaultEdge.class)) { graph, component ->      // Map components and its dependencies to a directed graph
            graph.addVertex(component.key)

            component.value.each { dep ->
                graph.addVertex(dep)
                graph.addEdge(component.key, dep)                               // A dependency is represented by a edge in the graph (note this is a single direction)
            }

            graph
        }

    while(graph.vertexSet().size() > 0) {                                       // Keep building until the graph is empty, no verticies == no build stages
        def stages = graph.vertexSet().findResults { node ->
            if (graph.outgoingEdgesOf(node).size() == 0) {                      // Only care about verticies that have no edges pointing to something, this means it can be built without relying on something to be build first
                return node
            }
        }

        if (stages.size() > 1) {                                                // Optimise build time by running stages in parallel, this is safe because all the stages have no dependency on each other
            parallel stages.collectEntries {
                [it, { stageFactory(it) }]
            }
        } else {
            stageFactory(stages[0])
        }

        stages.each {                                                           // Once all the stages are done, remove them from the graph, this will allow the next iteration of this while loop to identity new vertices that have no dependencies (because they are already built)
            graph.removeVertex(it)
        }
    }
}
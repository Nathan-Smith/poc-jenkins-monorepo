@Grab('org.jgrapht:jgrapht-core:1.4.0')

import org.jgrapht.*;
import org.jgrapht.graph.*;
import org.jgrapht.nio.*;
import org.jgrapht.nio.dot.*;
import org.jgrapht.traverse.*;

Graph<String, DefaultEdge> graph = new DefaultDirectedGraph<>(DefaultEdge.class);

def components = [
    "app1": ["lib1", "lib3"],
    "app2": ["lib3"],
    "lib1": [],
    "lib2": [],
    "lib3": ["lib2"],
    "tests1": ["app1", "app2"],
    "tests2": ["app1"]
]

graph.addVertex(".")

components.each { component ->
    println "Component ${component.key}"
    graph.addVertex(component.key)
    graph.addEdge(".", component.key)

    component.value.each { dep ->
        println "--> Adding dep ${dep}"
        graph.addVertex(dep)
        graph.addEdge(component.key, dep)
    }
}

println graph

def jobs = []

while(graph.vertexSet().size() > 1) {
    def stages = []
    graph.vertexSet().each { node ->
        if (graph.outgoingEdgesOf(node).size() == 0) {
            stages.add(node)
        }
    }

    jobs.add(stages)
    stages.each {
        graph.removeVertex(it)
    }

    println graph
}

println jobs

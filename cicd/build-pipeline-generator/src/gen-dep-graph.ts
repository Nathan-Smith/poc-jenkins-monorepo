import compact from 'lodash.compact'
import find from 'lodash.find'
import { DepGraph } from 'dependency-graph'
import fs from 'fs'
import glob from 'glob'
import { basename, dirname, resolve } from 'path'

export interface Component {
  path: string
  name: string
}

/**
 * Traverses a directory for components and its dependencies, generating a directed graph.
 * @param rootPath The root directory where the scan for components starts.
 * @returns Directed Graph where every component is a node and each of its dependencies is a edge towards from that node to the node for the dependency component.
 */
export default function generateDepGraph(
  rootPath: string
): DepGraph<Component> {
  return glob
    .sync('*/**/VERSION', { cwd: rootPath, ignore: ['**/node_modules/**'] }) // Find components by directories containing a VERSION
    .map(dirname) // Just need the directory name, since this is what the component is named
    .reduce((graph, path, _i, paths) => {
      const component = basename(path)
      // For every component, add it to the graph as a node, if the component as a set of dependencies add them too with a edge joining the component
      graph.addNode(component)
      graph.setNodeData(component, {
        name: component,
        path: resolve(rootPath, path),
      })

      // Detect a human error that the dependency does exist but isn't a component because it lacks a Jenkinsfile
      if (!fs.existsSync(resolve(rootPath, path, 'Jenkinsfile'))) {
        throw `${component} is missing a Jenkinsfile`
      }

      const depsPath = resolve(rootPath, path, 'deps')

      // If the component has no dependencies then nothing more is needed
      if (!fs.existsSync(depsPath)) {
        return graph
      }

      compact(
        fs.readFileSync(depsPath, 'utf8').split('\n') // Expect the deps file to simple line delimited list of component names that is depends on
      ).forEach((depName) => {
        const depPath = find(paths, (a) => basename(a) === depName)

        // Detect a human error that the dependency actually doesn't exist anywhere
        if (!depPath) {
          throw `${depName} is missing from repo or is missing a VERSION file`
        }

        graph.addNode(depName)
        graph.addDependency(component, depName)
      })

      return graph
    }, new DepGraph<Component>())
}

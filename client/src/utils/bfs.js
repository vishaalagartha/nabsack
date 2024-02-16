import { GRAPH } from "./constants"

const bfs = (source, destination) => {
  let level = [[source, [source]]]
  const visited = new Set()
  const results = []
  while (level) {
    const newLevel = []
    for(const obj of level) {
      const [node, path] = obj
      if (node === destination) {
        return path
      }
      if (path.length > 7 || GRAPH[node] === undefined) {
        return []
      }
      visited.add(node)
      for (const neighbor of GRAPH[node]) {
        if (!visited.has(neighbor)) {
          newLevel.push([neighbor, [...path, neighbor]])
        }
      }
    }
    if (results.length) {
      return results
    }
    level = newLevel
  }
  return []
}

export default bfs
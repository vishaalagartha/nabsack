import * as d3 from 'd3'
import ForceGraph from 'force-graph'

const filterGraph = graph => {
  const links = graph.links.filter(l => l.years[0] > 2024)
  const nodes = new Set()
  links.forEach(l => {
    nodes.add(l.source)
    nodes.add(l.target)
  })
  return {
    nodes: Array.from(nodes).map(n => ({ id: n })),
    links
  }
}

const drawNetwork = () => {
  window.devicePixelRatio = 1;
  fetch('./network.json', { headers: {
    "Content-Type": "application/json",
  }}).then(res => res.json()).then(graph => {
    const Graph = ForceGraph()
    (document.getElementById('graph'))
      .graphData(graph)
      .d3AlphaDecay(0)
      .nodeRelSize(20)
      .nodeLabel('hello')
      .d3VelocityDecay(0.08)
      .onNodeHover(console.log)
      .cooldownTime(60000)
      .linkColor(() => 'rgba(0,0,0,0.05)')
      .zoom(0.05)
      .enablePointerInteraction(false);
  })
}

export default drawNetwork
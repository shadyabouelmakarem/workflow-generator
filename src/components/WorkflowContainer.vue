<template>
    <div class="workflow-container drag-container">
        <NodeComponent v-for="node in nodes" :key="node.name" :node="node" v-draggable @onMoved="nodeMoved(node.name)"
            @setInputConnector="setInputConnector" @setOutputConnector="setOutputConnector" />
    </div>
</template>

<script setup lang="ts">
import { WorkflowNode } from '@/interfaces';
import { ref, reactive, onMounted } from 'vue';
import { draggable } from '@/directives/Draggable'
import NodeComponent from "@/components/NodeComponent.vue"
import { drawLine as drawConnection } from "@/helpers/drawLine"

const nodes = reactive<WorkflowNode[]>([])
const inputConnectorSelector = ref<string | null>(null)
const outputConnectorSelector = ref<string | null>(null)

const vDraggable = draggable

function addNode(event: any) {
    nodes.push({ ...event.detail, name: `Node ${nodes.length + 1}`, inputNode: null, outputNode: null })
}

function setOutputConnector(outputConnector: string) { outputConnectorSelector.value = outputConnector; inputConnectorSelector.value = null }
function setInputConnector(inputConnector: string) { inputConnectorSelector.value = inputConnector; connectNodes(outputConnectorSelector.value, inputConnectorSelector.value); }

function connectNodes(n1: string | null, n2: string | null) {

    // return in case of missing connector or self connecting node
    if (!n1 || !n2 || n1 === n2) return

    const node1 = nodes.find(x => x.name === n1) as WorkflowNode
    const node2 = nodes.find(x => x.name === n2) as WorkflowNode
    // checks if one of the connectors is already connected to an existing node
    if (node1?.outputNode || node2?.inputNode) return

    // store connected nodes refrences inside each node accordingly    
    node1.outputNode = node2;
    node2.inputNode = node1;

    // draw a connection between the two nodes 
    drawConnection(n1, n2)
    outputConnectorSelector.value = null;
    inputConnectorSelector.value = null;
}

function nodeMoved(nodeName: string) {
    const movedNode = nodes.find(node => node.name === nodeName) as WorkflowNode

    // check if node had any connections and redraw them
    if (movedNode?.inputNode || movedNode?.outputNode) reDrawConnections(movedNode)
}

function reDrawConnections(node: WorkflowNode) {
    const connections = document.querySelectorAll(`[data-node-connection*="${node.name}"]`)
    connections.forEach(c => c.remove())
    if (node.outputNode)
        drawConnection(node.name, node.outputNode.name)
    if (node.inputNode)
        drawConnection(node.inputNode.name, node.name)

}
onMounted(() => window.addEventListener('addNode', addNode))

</script>

<style scoped lang="scss">
.workflow-container {
    flex: 1;
    align-self: stretch;
    justify-self: stretch;
    padding: 30px;
    margin: 0 50px;
    background: #ebeaea;
    border: 2px dashed #4b4b4b;
    border-radius: 5px;
    position: relative;

}
</style>

<style>
.node-connection {
    position: absolute;
    height: 1px;
    background: black;
    z-index: 2;
    transform-origin: top left;
}
</style>
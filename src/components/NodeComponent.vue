<template>
    <div @draggingStopped="nodeMoved" class="node">
        <b>{{ node.type }}</b>
        <svg v-if="node.input" :data-input-connector="node.name" @mousedown.stop="setInputConnector"
            class="input-connector" height="30" width="25">
            <path d="M0 30 L25 15 L0 0 Z" fill="#000" />
        </svg>
        <img :src="getImageSrc(node.image_src)" :alt="node.type">
        <svg v-if="node.output" :data-output-connector="node.name" @mousedown.stop="setOutputConnector"
            class="output-connector" height="30" width="25">
            <path d="M0 30 L25 15 L0 0 Z" fill="#000" />
        </svg>
        <span class="status" :class="[checkNodeStatus(node)]">
            <span></span><span></span><span></span></span>
        <span>{{ node.name }}</span>
    </div>
</template>
<script setup lang="ts">
import { WorkflowNode } from '@/interfaces';


const props = defineProps<{ node: WorkflowNode }>()
const emit = defineEmits<{
    (event: "setInputConnector", connector: string): void;
    (event: "setOutputConnector", connector: string): void;
    (event: "onMoved"): void;
}>();


function checkNodeStatus(node: WorkflowNode) {
    let score = 0;
    if (node.input && node.inputNode) score++
    if (node.output && node.outputNode) score++
    if (node.input && node.output) score /= 2
    return score ? (score < 1 ? 'partially-configured' : 'configured') : 'unconfigured'
}

function getImageSrc(image_src: string) {
    return require(`@/assets/${image_src}`)
}

function setInputConnector() {
    emit("setInputConnector", props.node.name);
}
function setOutputConnector() {
    emit("setOutputConnector", props.node.name);
}

function nodeMoved() {
    emit("onMoved");
}

</script>
<style lang="scss" scoped>
.node {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    z-index: 1;
    cursor: move;

    b {
        white-space: nowrap;
    }


    .input-connector,
    .output-connector {
        cursor: crosshair;
        position: absolute;
        top: 50%;
    }

    .input-connector {
        right: 50%;
        transform: translate(-50px, -40px);
    }

    .output-connector {
        left: 50%;
        transform: translate(50px, -40px);
    }

    img {
        width: 100px;
        height: 100px;
    }

    .status {
        width: 100px;
        height: 30px;
        background: #cacaca;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 5px;

        span {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            background: white;
        }

        &.unconfigured span:first-child {
            background: red;
        }

        &.partially-configured span:nth-child(2) {
            background: yellow;
        }

        &.configured span:nth-child(3) {
            background: green;
        }
    }
}
</style>
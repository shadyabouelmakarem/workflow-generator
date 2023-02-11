<template>
    <div class="search-component">
        <input type="text" v-model="searchTerm" class="search-input" placeholder="Add new node..." />
        <i class="material-icons search-icon">search</i>
        <ul ref="searchResultsRef" class="search-results" tabindex="1">
            <li v-for="node in filteredNodes" :key="node.type" @click.prevent="selectNode(node)">
                {{ node.type }}
            </li>
            <li v-if="!filteredNodes.length" class="unclickable">No matching nodes found ...</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { nodes as data } from '@/data'
import { Node } from '@/interfaces'


const searchTerm = ref('')
const searchResultsRef = ref(null as any)
const nodes = ref<Node[]>(data)

const filteredNodes = computed(() =>
    searchTerm.value ?
        nodes.value.filter(node => node.type.toLowerCase().startsWith(searchTerm.value.toLowerCase()))
        :
        nodes.value
)

function selectNode(node: Node) {
    /*
        I'm using window events for task simplicity, but in actual work env we could use:
        - State managment approach (for ex: Vuex)
        - Custom Pub Sub pattern
        - Vue component emmiters (Not recommended between siblings components) 
    */
    searchTerm.value = '';
    searchResultsRef.value.blur();
    const event = new CustomEvent("addNode", { detail: node });
    window.dispatchEvent(event)
}

</script>

<style lang="scss" scoped>
.search-component {
    display: flex;
    width: 300px;
    align-items: center;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 10px;
    position: relative;

    .search-input {
        flex: 1;
        height: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        box-sizing: border-box;
    }

    .search-icon {
        font-size: 20px;
        color: #999;
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        display: none;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        z-index: 999;

        li {
            padding: 10px;
            cursor: pointer;

            &:hover {
                background-color: #ddd;
            }

            &.unclickable {
                pointer-events: none;
            }
        }
    }

    &:focus-within .search-results {
        display: block;
    }
}
</style>

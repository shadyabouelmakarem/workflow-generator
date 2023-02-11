<template>
  <div class="main-layout">
    <SearchComponent />
    <WorkflowContainer />

  </div>
</template>

<script setup lang="ts">
import SearchComponent from './components/SearchComponent.vue';
import WorkflowContainer from './components/WorkflowContainer.vue';

/*
  For simplicity I'm using the main App component to
  render the two main components and applying some styling,
  but in actual work environment we should use it to only
  render entry component with code as minimal as possible
*/
</script>

<style lang="scss">
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;


  .main-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 50px 0;
    height: 100%;
  }
}
</style>

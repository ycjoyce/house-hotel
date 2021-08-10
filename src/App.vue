<template>
  <router-view
    :key="$route.path"
  ></router-view>
</template>

<style lang="scss">
  @import '@src/styles/all.scss';
</style>
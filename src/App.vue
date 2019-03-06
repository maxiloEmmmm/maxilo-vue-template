<template>
  <transition>
    <router-view/>
  </transition>
</template>

<style lang="scss">
@import '~assets/sass/yeshuzhi/index.scss';
@import '~assets/sass/help_bootstrap.scss';
@import '~animate.css/animate.css';
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-weight: 300 !important;
    font-family: Poppins !important;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    color: #000;
  }
</style>

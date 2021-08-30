<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>抽奖转盘</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://qciwmk.web.cloudendpoint.cn/"
        target="_self"
        text
      >
        <span class="mr-2">客户端</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  
};
</script>

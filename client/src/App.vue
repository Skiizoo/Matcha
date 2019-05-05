<template>
  <div id="app">
    <navbar v-if="user_session"/>
    <transition name="el-fade-in" mode="out-in">
      <router-view class="container-fluid"/>
    </transition>
  </div>
</template>

<script>
  import Navbar from '@/components/nav/Nav.vue'
  import Vuex from 'vuex'

  export default {
    name: "App",
    data() {
      return {
        user_session: '',
        title: "Matcha",
      }
    },
    watch: {
        '$route.meta.title' (to, from) {
          this.title = this.$route.meta.title;
        },
    },
    async created() {
      var usr = await this.$store.dispatch('getUserByAuthToken')
      if (usr) {
        this.$store.state.session = usr.data._nickName
        this.user_session = usr.data._nickName
      }
    },
    async updated() {
      this.user_session = this.$store.state.session;
    },
    computed: {
      ...Vuex.mapState({
        user: state => state.session
      })
    },
    components: {
      Navbar,
    }
  }
</script>
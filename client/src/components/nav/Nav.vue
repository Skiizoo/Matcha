<template>
	<header>
		<nav class="navbar">
			<div class="container-fluid">
				<div class="nav-search d-md-inline-block d-lg-inline-block">
					<i class="fas fa-search d-none"></i>
					<input type="search" @click="searchPage" v-model="search" placeholder="Rechercher une personne.."/>
				</div>
				<div class="nav-icon">
					<router-link tag="i" :to="{ name: 'home'}"  class="far fa-compass" :class="{active: active === 'home' || active === null}"></router-link>
					<router-link tag="i" :to="{ name: 'chat'}" class="far fa-comments" :class="{active: active === 'chat', far: !newMessage, fas: newMessage}"></router-link>
					<router-link tag="i" :to="{ name: 'disconnect'}" class="fas fa-sign-out-alt"></router-link>
					<router-link tag="i" :to="{ name: 'settings'}" class="fas fa-ellipsis-h" :class="{active: active === 'settings'}"></router-link>
				</div>
			</div>
		</nav>
		<el-alert
			v-for="notification in notifications"
			:key="notification.id"
			:title="notification.notifications"
			type="info"
			show-icon
			@close="setNotificationsToNull(notification.id)">
		</el-alert>
	</header>
</template>

<script>
    export default {
		name: "Nav",
		data() {
			return {
				active: undefined,
				search: "",
				newMessage: false,
				notifications: {},
			}
		},
		mounted() {
			this.active = this.$route.name;
			this.lookingForNotifications()

			this.$options.sockets.SHOW_NOTIFS = (data) => { this.lookingForNotifications() }
		},
		watch: {
			'$route' (to, from) {
				this.active = this.$route.name;
			},
			'search' (n, o) {
				this.$store.state.search = this.search;
			},
			'$store.state.quitSearch' (n, o) {
				if (this.$store.state.quitSearch) {
					this.$store.state.quitSearch = false;
					this.search = "";
				}
			}
		},
		methods: {
			searchPage() {
				this.$router.push({name: 'search', query: { q: this.search }});
			},
			async lookingForNotifications() {
				var res = await this.$store.dispatch('getNotifications', this)
				if (res.data) this.notifications = res.data
			},
			async setNotificationsToNull(id) {
				var res = await this.$store.dispatch('setNotificationsToNull', id)
			},
		}
	}
</script>

<style scoped>
span {
    cursor: pointer;
}
i.far.fa-comments.fas {
    color: #eda45b;
}
.navbar {
  width: 100%;
  height: 58px;
  -webkit-box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
}

.nav-search {
  color: #bebebe;
  width: 30%;
}

.nav-search .fas {
  margin-right: 15px;
  font-size: 14px;
}

.nav-search > input {
  border: none;
  color: #bebebe;
  width: 80%;
}

.nav-search > input::-webkit-input-placeholder {
  color: #bebebe;
}

.nav-search > input:-ms-input-placeholder {
  color: #bebebe;
}

.nav-search > input::-ms-input-placeholder {
  color: #bebebe;
}

.nav-search > input::placeholder {
  color: #bebebe;
}

.nav-search > input:focus {
  outline: none;
}

.nav-icon {
  font-size: 20px;
}

.nav-icon > .fas {
  color: #c4c4c4;
  margin: 0px 10px;
}

.nav-icon > .far {
  color: #c4c4c4;
  margin: 0px 10px;
}

.nav-icon #new-message {
  color: #eb7979;
}

.nav-icon > .fas:hover {
  color: #a5a1a1;
  cursor: pointer;
}

.nav-icon > .far:hover {
  color: #a5a1a1;
  cursor: pointer;
}

.nav-icon .active {
  text-shadow: 0 3px 6px rgba(237, 164, 91, 0.26);
  color: #eda45b;
}

.nav-icon .active:hover {
  color: #db8732;
}

.nav-icon > .nav-img {
  width: 35px;
  height: 35px;
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  margin-left: 10px;
  margin-top: 8px;
}
</style>
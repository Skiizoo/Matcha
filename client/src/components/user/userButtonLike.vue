<template>
	<div>
		<button v-if="!isRelation" :class="{ userlike: isLike, userunlike: !isLike }" @click="changeLike">	
			<i class="fas fa-heart" :class="{likeYou: likeMe}"></i>
		</button>
		<button v-if="isRelation" class="userlike col-6" @click="goToConversation">	
			<i class="fas fa-comments" style="font-size: 18px"></i>
		</button>
		<button v-if="isRelation" class="col-5 offset-1" :class="{ userlike: isLike, userunlike: !isLike }" @click="changeLike">	
			<i class="fas fa-heart" :class="{likeYou: likeMe}"></i>
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				likeMe: false,
				isLike: false,
				isRelation: false,
				usr: {}
			}
		},
		props: [
			'user'
		],
		mounted() {
			this.$options.sockets.GET_DATA = (data) => { this.getData() }
		},
		watch: {
			async 'user' (n, o) {
				this.getData()
			},
		},
		methods: {
			async changeLike() {
				if (!this.isLike) {
					var result = await this.$store.dispatch('addLike', this);
					if (result.status === 200) {
						this.isLike = true;
						this.isRelation = result.data
					}
				} else {
					var result = await this.$store.dispatch('removeLike', this);
					if (result.status === 200) this.isLike = false;
					this.isRelation = false
				}

				this.$socket.emit('NOTIFS', { userNotified: this.user.id })
				this.$socket.emit('USER_DATA', { user: this.user.id })
				this.$socket.emit('USER_MSG', { user: this.$store.state.session, userTargetted: this.user.id })
			},
			async goToConversation() {
				var result = await this.$store.dispatch('getConversation', this),
						id = result.data.id;
				if (!result.data) {
					var n = await this.$store.dispatch('createConversation', this);
					if (n.status !== 200) return;
					id = n.data.id;
				}
				this.$router.push({name: 'chat', query: { id: id, u1: this.$store.state.session, u2: this.user._nickName }});
			},
			async getData() {
				var result = await this.$store.dispatch('likeYou', this);
				this.likeMe = result.data ? true : false;
	
				var result = await this.$store.dispatch('isLike', this);
				this.isLike = result.data ? true : false;

				var result = await this.$store.dispatch('isRelation', this);
				this.isRelation = result.data ? true : false;
			}
		}
	}
</script>

<style scoped>
.likeYou {
	color: rgb(207, 75, 75);
}
.userlike {
  border-radius: 5px;
  border: none;
  margin-top: 15px;
  width: 100%;
  padding: 10px 15px;
  color: white;
  background-image: linear-gradient(60deg, #eda45b, #e29b53);
  -webkit-box-shadow: 0 12px 15px rgba(226, 154, 83, 0.23);
          box-shadow: 0 12px 15px rgba(226, 154, 83, 0.23);
  cursor: pointer;
}
.userunlike {
  cursor: pointer;
  border-radius: 5px;
  border: none;
  margin-top: 15px;
  width: 100%;
  padding: 10px 15px;
  background: rgba(209, 209, 209, 0.23);
  color: #929292;
  -webkit-box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
          box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
}
</style>
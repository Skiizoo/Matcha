<template>
	<main class="container" v-if="$store.state.session">
		<div>
			<h1>{{ user._firstName }} {{ user._lastName }}</h1>
			<user-visit :user="user"/>
			<hr>
		</div>
		<div class="row">
			<div class="col-md-3">
				<user-rate v-show="!userBlock" id="score" :user="user"/>
				<user-pictures v-show="!userBlock" :items="items"/>
				<user-button-like v-show="items[0] && !userBlock && !isMe && hasPP" :user="user"/>
				<user-button-block v-show="!isMe" :user="user" @changeBlock="changeBlock"/>
				<user-bad-account v-show="!isMe" :user="user"/>
			</div>
			<div class="col-md right-user-item" v-show="!userBlock">
				<p v-if="user._nickName" ><span class="user-desc-title">Pseudo</span> {{ user._nickName }}</p>
				<p v-if="user._gender"><span class="user-desc-title">Sexe</span> {{ user._gender === 1 ? "Homme" : "Femme" }}</p>
				<p v-if="user._orientation"><span class="user-desc-title">Intéressé par</span> {{ user._orientation === 1 ? "Homme" : user._orientation === 2 ? "Femme" : "Homme/Femme"}}</p>
				<p v-if="user._birthDate"><span class="user-desc-title">Date de naissance</span> {{ user._birthDate }}</p>
				<p v-if="user._description"><span class="user-desc-title">Description</span> {{ user._description }}</p>
				<span v-if="tags" class="user-desc-title">Intérets</span>
				<el-tag
					type="warning"
					:key="tag"
					v-for="tag in tags"
					:disable-transitions="false">
					{{ tag }}
				</el-tag>
			</div>
		</div>
		<user-history v-if="!userBlock" :users="users" :title="'Ses derniers visiteurs...'" />
	</main>
</template>

<script>
	import userPictures from "@/components/user/userPictures"
	import userButtonLike from "@/components/user/userButtonLike"
	import userRate from "@/components/user/userRate"
	import userVisit from "@/components/user/userVisit"
	import userButtonBlock from "@/components/user/userButtonBlock"
	import userBadAccount from "@/components/user/userBadAccount"
	import userHistory from "@/components/user/userHistory"

	export default {
		components: {
			userPictures,
			userButtonLike,
			userRate,
			userVisit,
			userButtonBlock,
			userBadAccount,
			userHistory
		},
		data() {
			return {
				isMe: false,
				user: '',
				items: [],
				tags: [],
				userBlock: false,
				users: [],
				hasPP: false
			}
		},
		watch: {
			async '$route' (to, from) {
				this.getData()
			}
		},
		beforeCreate() {
			if (!this.$store.state.session) this.$router.push({ name: 'login'})
		},
		created() {
			if (this.$store.state.session) this.getData()
		},
		methods: {
			changeBlock(block, user) {
				this.userBlock = block;
			},
			async getData() {
				var result = await this.$store.dispatch('getUser', this.$route.query.n);
				var tmp = await this.$store.dispatch('getUser', this.$store.state.session)
				this.hasPP = tmp.data._profilePicture ? true : false
				this.user = result.data;
				this.isMe = this.user._nickName === this.$store.state.session
				this.items = []
				if (this.user._profilePicture) this.items.push(this.user._profilePicture);
				else this.items.push('/img/no-avatar.png')
				if (this.user._picture1) this.items.push(this.user._picture1);
				if (this.user._picture2) this.items.push(this.user._picture2);
				if (this.user._picture3) this.items.push(this.user._picture3);
				if (this.user._picture4) this.items.push(this.user._picture4);
				if (this.user._interest) this.tags = JSON.parse(this.user._interest);
				var result = await this.$store.dispatch('addVisiters', this)

				this.$socket.emit('NOTIFS', { userNotified: this.user.id })
				
				var result = await this.$store.dispatch('getVisiters', this)
				this.users = result.data
			}
		}
	}
</script>

<style scoped>
#score {
	text-align: center;
	margin: 10px 10px;
}
.right-user-item {
  background: #f7f7f7;
  border-radius: 5px;
  width: 250px;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  -webkit-box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
  box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
}

.right-user-item .user-desc-title {
  font-weight: 800;
  color: #eda45b;
  font-size: 12px;
  display: block;
}
</style>
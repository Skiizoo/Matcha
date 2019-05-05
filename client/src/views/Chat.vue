<template>
	<main class="container" v-if="$store.state.session">
		<div class="d-none d-sm-block">
			<h1>Chat</h1>
			<hr>
		</div>
		<div class="row chat">
			<chat-left :user="user"/>
			<chat-right/>
		</div>
	</main>
</template>

<script>
	import ChatLeft from '@/components/chat/chatLeft.vue'
	import ChatRight from '@/components/chat/chatRight.vue'

	export default {
		data() {
			return {
				user: '',
				message: '',
				messages: [],
			}
		},
		async beforeCreate() {
			if (!this.$store.state.session) this.$router.push({ name: 'login'});
			else {
				var result = await this.$store.dispatch('getUser', this.$store.state.session);
				this.user = result.data;
			}
		},
		components: {
			ChatRight,
			ChatLeft,
		}
	}
</script>
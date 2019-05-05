<template>
	<div>
		<button :class="{ userlike: userBlock, userunlike: !userBlock }" @click="changeBlock">	
			<i class="fas fa-ban"></i>
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userBlock: false,
			}
		},
		props: [
			'user',
		],
		watch: {
			async 'user' (n) {
				if (this.$store.state.session === this.user._nickName) return this.isMe = true;

				var result = await this.$store.dispatch('getBlocks', this.$store.state.session),
					blocks = result.data.block ? JSON.parse(result.data.block) : [];
				if (blocks.find(b => b === this.user._nickName)) {
					this.userBlock = true;
					this.$emit('changeBlock', true);
				}
			},
		},
		methods: {
			async changeBlock() {
				if (!this.userBlock) {
					var result = await this.$store.dispatch('addBlock', this);
					this.userBlock = true;
					this.$emit('changeBlock', true);
				} else {
					var result = await this.$store.dispatch('removeBlock', this);
					this.userBlock = false;
					this.$emit('changeBlock', false);
				}
				this.$socket.emit('USER_MSG', { user: this.$store.state.session, userTargetted: this.user.id })
			}
		}
	}
</script>

<style scoped>
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
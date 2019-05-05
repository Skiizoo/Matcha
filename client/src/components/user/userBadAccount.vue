<template>
	<div>
		<button :class="{ userlike: userReported, userunlike: !userReported }" @click="report">	
			<i class="fas fa-flag"></i>
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                userReported: false
			}
		},
		props: [
			'user'
		],
		watch: {
			async 'user' (n) {
                if (this.$store.state.session === this.user._nickName) return this.isMe = true;
                var result = await this.$store.dispatch('getReportedUser', this)
                this.userReported = result.data ? true : false
			}
		},
		methods: {
			async report() {
                var result = await this.$store.dispatch('reportUser', this);
                this.userReported = result.data ? true : false
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


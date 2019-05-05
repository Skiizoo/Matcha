<template>
	<div id="user-rate">
		<el-rate
			v-if="!isRate"
			@click.native="sendRate"
			v-model="rate"
			:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
		</el-rate>
		<el-rate
			v-else
			disabled
			v-model="rate"
			:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
		</el-rate>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rate: null,
				isRate: false,
			}
		},
		props: [
			"user",
		],
		watch: {
			async "user" (n) {
				if (this.$store.state.session === this.user._nickName) return this.isRate = true;

				var rates = await this.$store.dispatch('getRates', this);
				this.rate = rates.data ? rates.data._popularity : 0;

				var result = await this.$store.dispatch('isRate', this);
				if (result.data) {
					this.isRate = true;
				}
			}
		},
		methods: {
			async sendRate() {
				var result = await this.$store.dispatch('sendRate', this);
				this.isRate = true;
			}
		}
	}
</script>

<style scoped>
</style>
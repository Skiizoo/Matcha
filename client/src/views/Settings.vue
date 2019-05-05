<template >
	<main class="container" v-if="$store.state.session">
    <div>
      <h1>Réglages</h1>
      <hr>
    </div>
		<box-settings/>
	</main>
</template>

<script>
	import BoxSettings from '@/components/BoxSettings.vue'

	export default {
		components: {
			BoxSettings,
		},
		beforeCreate() {
			if (!this.$store.state.session) this.$router.push({ name: 'login'})
		}
	}
</script>
<template>
	<div>
		<div v-if="!user._online">
			<p>Dernière visite: {{ user._lastVisited }}</p>
		</div>
		<div id="online" v-if="user._online">
			<i class="fas fa-circle"></i> En ligne
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lastVisit: null,
				isOnline: false,
			}
		},
		props: [
			"user"
		],
	}
</script>

<style scoped>
p {
	color: gray;
	font-size: 13px;
}
#online {
	font-size: 13px;
	color: rgb(79, 206, 79);
}
</style>
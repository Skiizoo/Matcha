<template>
	<div class="left-user-item">
		<el-carousel :autoplay="false" indicator-position="none" height="250px">
			<el-carousel-item v-for="item in items" :key="item">
				<div class="img-item" :style="{ backgroundImage: 'url(' + item + ')' }"></div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		props: [
			"items"
		]
	}
</script>

<style scoped>
.left-user-item {
  background: white;
  border-radius: 5px;
  width: 250px;
  overflow: hidden;
  -webkit-box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
          box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
}

.left-user-item .img-item {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  display: block;
}
</style>
<template>
	<router-link tag="div" :to="{ path: `/user?n=${profil.nickName}`}">
		<figure class="search-item">
			<img :alt="profil.nickName" :src="profil.profilePicture"/>
			<figcaption>
				<h4>{{ profil.firstName }} {{ profil.lastName }} ({{ profil.nickName }})</h4>
				<p v-if="profil.description">{{ profil.description }}</p>
			</figcaption>
		</figure>
	</router-link>
</template>

<script>
	export default {
		props: ['profil'],
		data() {
			return {
				items: []
			}
		},
		async beforeMount() {
			this.items.push(this.profil.profilePicture)
			if (this.profil.picture1) this.items.push(this.profil.picture1)
			if (this.profil.picture2) this.items.push(this.profil.picture2)
			if (this.profil.picture3) this.items.push(this.profil.picture3)
			if (this.profil.picture4) this.items.push(this.profil.picture4)
		},
	}
</script>

<style scoped>
body {
	margin:0;
}
figure {
	margin: 0;
	padding: 0;
	height: 365px;
	position: relative;
	display: block;
	cursor: pointer;
	overflow: hidden;
	border: 2px solid #fff;
}
figure:hover figcaption {
	opacity: 1;
	top: 0;
}
figcaption {
	opacity: 0;
	position: absolute;
	height: 100%;
	width: 100%;
	background: rgba(64,158,255,.3);
	color: #fff;
	-webkit-transition: all .9s ease;
	-moz-transition: all .9s ease;
	-o-transition: all .9s ease;
	-ms-transition: all .9s ease;
	transition: all .9s ease;
	text-align: center;
}
figure img {
	-webkit-transition: all 1.5s;
	-moz-transition: all 1.5s;
	-o-transition: all 1.5s;
	-ms-transition: all 1.5s;
	transition: all 1.5s;
	height: 365px;
    max-width: 285px;
}
figure:hover img {
	-webkit-transform: scale(1.1);
	-moz-transform: scale(1.1);
	-o-transform: scale(1.1);
	-ms-transform: scale(1.1);
	transform: scale(1.1);
}
figcaption h4 {
	font-family: 'Open sans';
	font-weight: 400;
	padding: 10px 20px;
	margin-bottom: 0;
	position: relative;
    font-size: 30px;
    top: 12%;
    color: white !important;
}
figcaption p {
	font-family: 'Open sans';
	padding: 10px 20px;
	margin-bottom: 0;
	margin-top: 20px;
	position: relative;
	top: 12%;
	font-size: 13px;
}
figure:hover h4,figure:hover p {
	left: 0;
}
figcaption a {
	color: #fff;
	border: 2px solid #fff;
	padding: 4px 10px;
	text-decoration: none;
}
figcaption a:hover {
	color: #4f5856;
	background: #fff;
}
figcaption input[type=submit] {
	margin-top: 80px;
	color: #FFF;
	border: solid 1px #CCC;
	background: gray;
}
.search-item {
  background: white;
  border-radius: 5px;
  width: 300px;
  overflow: hidden;
  margin: 30px;
  -webkit-box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
  box-shadow: 0 12px 15px rgba(209, 209, 209, 0.23);
}
.search-item .item-name {
  padding: 8px 20px 2px;
}
.search-item .item-desc {
  padding: 0 15px 10px 15px;
  font-size: 14px;
  color: #a3a3a3;
}
.search-item .img-item {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  display: block;
}
</style>

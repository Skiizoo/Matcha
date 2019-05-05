<template>
	<div class="container-fluid" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)" v-if="$store.state.session">
		<box-search :search="search" v-on:getSearchedUsers='getSearchedUsers'/>
		<div id="googleMaps"></div>
		<div class="searchedUsers">
			<ul class="search-container list-searchedUsers">
				<li class="item-searchedUsers" v-for="(profil, index) in paginatedProfils" :key="`profil-${index}`">
					<little-user class="col-12" :profil="profil"/>
				</li>
			</ul>
			<box-pagination :profils="profils" v-on:getPaginatedUsers="getPaginatedUsers"/>
		</div>
	</div>
</template>

<script>
	import littleUser from "@/components/littleUser.vue"
	import BoxSearch from "@/components/BoxSearch.vue"
	import BoxPagination from "@/components/BoxPagination.vue"

	export default {
		components : {
			littleUser,
			BoxSearch,
			BoxPagination
		},
		data() {
			return {
				search: '',
				profils: [],
				paginatedProfils: [],
				loading: true,
				sort: {},
				user: {}
			}
		},
		watch: {
			async '$store.state.search' (n, o) {
				this.search = this.$store.state.search
				this.$router.replace({ query: {q: this.search}})
			}
		},
		beforeCreate() {
			if (!this.$store.state.session) this.$router.push({ name: 'login'})
		},
		beforeMount() {
			this.search = this.$store.state.search
		},
		beforeDestroy() {
			this.$store.state.quitSearch = true
		},
		methods: {
			async getSearchedUsers(value) {
				this.sort = value.sort
				this.loading = true
				var result = await this.$store.dispatch('getSearchedUsers', this)
				if (result.data) this.profils = result.data
				this.loading = false
				this.initMap()
			},
			getPaginatedUsers(value) {
				this.paginatedProfils = value
			},
			async initMap() {
				var result = await this.$store.dispatch('getUser', this.$store.state.session)
				if (result.data) this.user = result.data
				var position = {'lat': this.user._latitude, 'lng': this.user._longitude},
					map = new google.maps.Map(document.getElementById("googleMaps"), {zoom: 10, center: position, mapTypeId: 'terrain'}),
					cityCircle = new google.maps.Circle({
						strokeColor: '#409EFF',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#409EFF',
						fillOpacity: 0.35,
						map: map,
						center: position,
						radius: this.sort.valueDistance * 1000
					});
				this.profils.forEach(element => {
					var position = { 'lat': element.latitude, 'lng': element.longitude },
						content =`<div class='content-googleMaps'><div class='row'><div class='col-md-4'><img alt='' src='${element.profilePicture}'/></div><div class='col-md-7'><h4>${element.nickName}</h4><p>${element.description}</p></div></div></div>`,
						infowindow = new google.maps.InfoWindow({
							content: content
						}),
						marker = new google.maps.Marker({
							icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
							position: position,
							map: map,
							title: element.nickName
						})
					marker.addListener('click', function() {
						infowindow.open(map, marker)
					})
				});
			}
		}
	}
</script>

<style scoped>
.el-loading-parent--relative {
    position: static!important;
}
.el-loading-spinner i {
    color: #eda45b;
}
a.a_pagination {
	padding: 10px;
	color: black
}
a.a_pagination.current, a.a_pagination:hover {
    background: #eda45b;
	color: white;
	text-decoration: none
}
#googleMaps {
	width: 80%;
	height: 500px;
	margin: auto;
	margin-top: 20px
}
.col-md-7 {
    text-align: center;
    margin-top: 9vh;
    transform: translateY(-50%);
	padding-left: 60px;
}
.search-container {
  margin-top: 20px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.search-container:hover {
  cursor: pointer;
}
.recommandedUsers h3, .searchedUsers h3 {
    text-align: center;
    text-transform: uppercase;
    text-decoration: underline;
    color: gray;
    margin-top: 30px; 
}
.recommandedUsers ul, .searchedUsers ul {
    display: inline-block;
    width: 100%;
    height: auto;
    padding: 0;
    text-align: center;
	list-style: none;

}
.recommandedUsers ul li, .searchedUsers ul li {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 25px 0 25px;
}
</style>

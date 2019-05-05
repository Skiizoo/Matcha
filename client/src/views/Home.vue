<template>
	<div>
		<div v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)" v-if="fullProfil && $store.state.session">
			<box-recommandations :sort="sort" v-on:getRecommandedUsers='getRecommandedUsers' v-on:getSortedUsers='getSortedUsers'/>
			<div class="recommandedUsers">
				<ul class="search-container list-recommandedUsers">
					<li class="item-recommandedUsers" v-for="(profil, index) in paginatedProfils" :key="`profil-${index}`">
						<little-user class="col-12" :profil="profil"/>
					</li>
				</ul>
				<box-pagination :profils="profils" v-on:getPaginatedUsers="getPaginatedUsers"/>
			</div>
		</div>
		<div v-else>
			<p>Vous devez complètement renseigner votre profil.</p>
		</div>
	</div>
</template>

<script>
	import littleUser from "@/components/littleUser.vue"
	import BoxRecommandations from "@/components/BoxRecommandations.vue"
	import BoxPagination from "@/components/BoxPagination.vue"

	export default {
		data() {
			return {
				profils: [],
				saveProfils: [],
				paginatedProfils: [],
				loading: true,
				sort: {},
				fullProfil: false
			}
		},
		async beforeCreate() {
			if (!this.$store.state.session) this.$router.push({ name: 'login'})
			else {
				var result = await this.$store.dispatch('getUser', this.$store.state.session);
				if (result.data._gender && result.data._orientation && result.data._description.length > 0 && result.data._firstName && result.data._lastName &&
					result.data._profilePicture && result.data._birthDate && result.data._latitude &&result.data._longitude)
					this.fullProfil = true
			}
		},
		methods: {
			async getRecommandedUsers(value) {
				this.loading = true
				var result = await this.$store.dispatch('getRecommandedUsers', this)
				if (result.data) {
					this.profils = result.data.recommandedUsers
					if (this.saveProfils.length === 0) this.saveProfils = this.profils
					if (this.sort.valueAge[0] !== result.data.sortedOptions.valueAge[0] || this.sort.valueAge[1] !== result.data.sortedOptions.valueAge[1] ||
						(this.sort.valueTags && this.sort.valueTags.length !== result.data.sortedOptions.valueTags.length) ||
						this.sort.valuePopularity[0] !== result.data.sortedOptions.valuePopularity[0] || this.sort.valuePopularity[1] !== result.data.sortedOptions.valuePopularity[1] ||
						this.sort.valueDistance !== result.data.sortedOptions.valueDistance)
						this.sort = result.data.sortedOptions
				}
				this.loading = false
			},
			async getSortedUsers(value) {
				this.loading = true
				var result = await this.$store.dispatch('getSortedUsers', this)
				if (result.data) this.profils = result.data
				this.loading = false
			},
			getPaginatedUsers(value) {
				this.paginatedProfils = value
			}
		},
		components : {
			littleUser,
			BoxRecommandations,
			BoxPagination
		}
	}
</script>

<style scoped>
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
}
.recommandedUsers ul li, .searchedUsers ul li {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 25px 0 25px;
}
.el-loading-parent--relative {
	position: static!important;
}
.el-loading-spinner i {
	color: #eda45b;
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
p {
    margin-top: 50vh;
    transform: translateY(-50%);
    text-align: center;
}
</style>



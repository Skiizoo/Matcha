<template>
    <ul class='ul_pagination'>
        <li class='li_pagination' v-for="index in nbPages" :key="index"><a class='a_pagination' href='#' v-on:click="changePage(index)" :class="{ current : index === pageNb }">{{ index }}</a></li>
	</ul>
</template>

<script>
export default {
    props: ['profils'],
	data() {
		return {
			pageNb: 1,
			nbPerPages: 30
			}
		},
		computed: {
			nbPages() {
				return Math.ceil(this.profils.length / this.nbPerPages)
			},
			usersList() {
				var tmp = { pageNb : this.pageNb, nbPerPages: this.nbPerPages },
					sortUsersList = tmp => (element, index, array) => {
						return tmp.pageNb === 1 ? index >= 0 && index < tmp.nbPerPages : index >= (tmp.pageNb - 1) * tmp.nbPerPages && index < tmp.pageNb * tmp.nbPerPages }
				return this.profils.filter(sortUsersList(tmp))
			}
		},
		watch: {
			profils() {
				this.changePage(1)
			}
		},
		methods: {
			changePage(pageNumber) {
                this.pageNb = pageNumber
                this.$emit('getPaginatedUsers', this.usersList)
			}
		}
	}
</script>

<style>
a.a_pagination {
	padding: 10px;
	color: black
}
a.a_pagination.current, a.a_pagination:hover {
    background: #eda45b;
	color: white;
	text-decoration: none
}
.ul_pagination {
	list-style: none;
}
.li_pagination {
	display: inline;
}
</style>
<template>
	<div class="sort-container">
			<div class="row">
				<div class="offset-md-1 col-md-10">
					<div class="block">
						<span class="demonstration">Age</span>
						<el-slider
							v-model="sort.valueAge"
							:min="18"
							:max="60"
							range>
						</el-slider>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-1 col-md-10">
					<div class="block">
						<span class="demonstration">Distance (km)</span>
						<el-slider
							v-model="sort.valueDistance"
							:max="valueDistance"
							show-input>
						</el-slider>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-1 col-md-10">
					<div class="block">
						<span class="demonstration">Popularité</span>
						<el-slider
							v-model="sort.valuePopularity"
							range
							:min="valuePopularity"
							:max="5">
						</el-slider>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-1 col-md-10">
					<div class="block">
						<span class="demonstration">Tags</span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="offset-md-1 col-md-10">
					<div class="block">
						<el-tag
							v-for="tag in sort.valueTags"
							:key="tag"
							closable
							:disable-transitions="false"
							@close="handleClose(tag)">
							{{ tag }}
						</el-tag>
						<el-input
							class="input-new-tag"
							v-if="inputVisible"
							v-model="inputValue"
							ref="saveTagInput"
							size="mini"
							@keyup.enter.native="handleInputConfirm"
							@blur="handleInputConfirm"
						>
						</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
export default {
	props: ['sort'],
	data() {
		return {
			inputVisible: false,
			inputValue: '',
			modified: false,
			valuePopularity: 0,
			valueDistance: 0,
			bool: true
		}
	},
	watch: {
		sort: {
			immediate: false,
			handler(value) {
				if (this.sort.valueTags) {
					if (this.bool) {
						this.valuePopularity = this.sort.valuePopularity[0]
						this.valueDistance = this.sort.valueDistance
						this.bool = false
					}
					this.$emit('getSortedUsers', this)
				}
			},
			deep: true
		}
	},
	created() {
		this.getRecommandedUsers()
	},
	methods: {
		getRecommandedUsers() {
			this.$emit('getRecommandedUsers', this)
		},
		handleClose(tag) {
			this.sort.valueTags.splice(this.sort.valueTags.indexOf(tag), 1)
		},
		showInput() {
			this.inputVisible = true
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus()
			})
		},
		handleInputConfirm() {
			let inputValue = this.inputValue.toLowerCase()
			if (inputValue.length > 25 || inputValue.length < 1 || this.sort.valueTags.find(m => m === inputValue))
				return
			else if (inputValue && this.sort.valueTags.length < 10)
				this.sort.valueTags.push(inputValue);
			this.inputVisible = false
			this.inputValue = ''
		}
	}
}
</script>

<style scoped>
.el-tag + .el-tag {
	margin-left: 10px;
}
.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
</style>
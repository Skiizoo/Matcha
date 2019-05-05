<template>
    <div class='sort-container'>
		<div class='row'>
			<div class='offset-md-1 col-md-10'>
				<div class='block'>
					<span class='demonstration'>Age</span>
					<el-slider
						v-model='sort.valueAge'
						:min='18'
						:max='60'
						range>
					</el-slider>
				</div>
			</div>
		</div>
		<div class='row'>
			<div class='offset-md-1 col-md-10'>
				<div class='block'>
					<span class='demonstration'>Distance (km)</span>
					<el-slider
						v-model='sort.valueDistance'
						:max='500'
						show-input>
					</el-slider>
				</div>
			</div>
		</div>
		<div class='row'>
			<div class='offset-md-1 col-md-10'>
				<div class='block'>
					<span class='demonstration'>Popularité</span>
					<el-slider
						v-model='sort.valuePopularity'
						range
						:max='5'>
					</el-slider>
				</div>
			</div>
		</div>
		<div class='row'>
			<div class='offset-md-1 col-md-10'>
				<div class='block'>
					<span class='demonstration'>Tags</span>
				</div>
			</div>
		</div>
		<div class='row'>
			<div class='offset-md-1 col-md-10'>
				<div class='block'>
					<el-tag
						v-for='tag in sort.valueTags'
						:key='tag'
						closable
						:disable-transitions='false'
						@close='handleClose(tag)'>
						{{ tag }}
					</el-tag>
					<el-input
						class='input-new-tag'
						v-if='inputVisible'
						v-model='inputValue'
						ref='saveTagInput'
						size='mini'
						@keyup.enter.native='handleInputConfirm'
						@blur='handleInputConfirm'
					>
					</el-input>
					<el-button v-else class='button-new-tag' size='small' @click='showInput'>+ New Tag</el-button>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
	props: ['search'],
    data() {
		return {
			inputVisible: false,
            inputValue: '',
            sort: {
                valueAge: [18, 60],
                valueDistance: 50,
                valueTags: [],
                valuePopularity: [0, 5]
            },
            modified: false
		}
    },
	watch: {
        sort: {
            handler(value) {
                if ((this.sort.valueAge[0] !== 18 || this.sort.valueAge[1] !== 60 || this.sort.valueDistance !== 50 || this.sort.valueTags.length !== 0 || this.sort.valuePopularity[0] !== 0 || this.sort.valuePopularity[1] !== 5) || this.modified) {
					this.getSortedUsers()
					this.modified = true
				}
            },
            deep: true
		},
		search() {
			this.getSortedUsers()
		}
	},
    created() {
		this.getSortedUsers()
    },
    methods: {
		getSortedUsers() {
            this.$emit('getSearchedUsers', this)
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
	},
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

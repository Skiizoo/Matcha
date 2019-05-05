<template>
	<div class="container">
		<el-tabs :tab-position="tabPosition">
			<el-tab-pane label="Photos">
				<label class="label-settings mt-4">Photo de profil</label>
				<el-form label-width="100px">
					<img v-if="profilePicture" :src="profilePicture" class="avatar">
					<el-form-item class="submit" style="margin-left:0">
						<input type="file" id="file0" ref="file0" v-on:change="handleFileUpload(0)"/>
						<el-button type="primary" @click="submitFiles(0)">Submit</el-button>
					</el-form-item>
				</el-form>
				<label class="label-settings mt-4">Photos</label>
				<ul class="ul-settings">
					<li>
						<el-form label-width="100px">
							<img v-if="picture1" :src="picture1" class="avatar">
							<el-form-item class="submit" style="margin-left:0">
								<input type="file" id="file1" ref="file1" v-on:change="handleFileUpload(1)"/>
								<el-button type="primary" @click="submitFiles(1)">Submit</el-button>
							</el-form-item>
						</el-form>
					</li>
					<li>
						<el-form label-width="100px">
							<img v-if="picture2" :src="picture2" class="avatar">
							<el-form-item class="submit" style="margin-left:0">
								<input type="file" id="file2" ref="file2" v-on:change="handleFileUpload(2)"/>
								<el-button type="primary" @click="submitFiles(2)">Submit</el-button>
							</el-form-item>
						</el-form>
					</li>
					<li>
						<el-form label-width="100px">
							<img v-if="picture3" :src="picture3" class="avatar">
							<el-form-item class="submit" style="margin-left:0">
								<input type="file" id="file3" ref="file3" v-on:change="handleFileUpload(3)"/>
								<el-button type="primary" @click="submitFiles(3)">Submit</el-button>
							</el-form-item>
						</el-form>
					</li>
					<li>
						<el-form label-width="100px">
							<img v-if="picture4" :src="picture4" class="avatar">
							<el-form-item class="submit" style="margin-left:0">
								<input type="file" id="file4" ref="file4" v-on:change="handleFileUpload(4)"/>
								<el-button type="primary" @click="submitFiles(4)">Submit</el-button>
							</el-form-item>
						</el-form>
					</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="Basique">
				<div>
					<label class="label-settings mt-4">Prénom</label>
					<el-input :maxlength="20" v-model="firstname" @blur="changeFirstname"></el-input>
				</div>
				<div>
					<label class="label-settings mt-4">Nom</label>
					<el-input :maxlength="20" v-model="lastname" @blur="changeLastname"></el-input>
				</div>
				<div>
					<label class="label-settings mt-4">Date de naissance</label>
					<el-date-picker
						v-model="birthDate"
						:picker-options="datePickerOptions"
						:class="request.birthDate"
						type="date"
						format="yyyy/MM/dd"
						value-format="yyyy-MM-dd"
						@change="checkBirthDate()">
					</el-date-picker>
					<el-collapse-transition>
						<div class="register-box d-sm-block d-md-none" v-if="boxBirthDate">
							{{ boxBirthDate }}
						</div>
					</el-collapse-transition>
				</div>
				<div>
					<label class="label-settings mt-4">Localisation</label>
					<vue-google-autocomplete
						ref="address"
						id="map"
						classname="form-control"
						placeholder=""
						v-on:placechanged="getAddressData"
						types="(regions)"
						country="fr"
					>
					</vue-google-autocomplete>
					<div id="googleMaps"></div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="Basique v2">
				<div>
					<label class="label-settings mt-4">Description</label>
					<el-input :rows="3" :maxlength="250" type="textarea" v-model="desc" @blur="changeDesc"></el-input>
				</div>
				<div>
					<label class="label-settings mt-4">Intérets</label>
					<el-tag
						type="warning"
						:key="tag"
						v-for="tag in dynamicTags"
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
						<el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nouveau tag</el-button>
				</div>
				<div>
					<label class="label-settings mt-4">Genre</label>
					<el-select v-model="genre" placeholder="Selection">
						<el-option
							v-for="item in genres"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div>
					<label class="label-settings mt-4">Orientation</label>
					<el-select v-model="orientation" placeholder="Selection">
						<el-option
							v-for="item in orientations"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</el-tab-pane>
			<el-tab-pane label="Avancée" v-if="!oauth">
				<div>
					<label class="label-settings mt-4">Email</label>
					<el-input type="email" :maxlength="30" v-model="mail" :class="request.mail" @blur="checkMail"></el-input>
				</div>
				<span class="bad-settings-span-input" v-if="boxMail">{{ boxMail }}</span>
				<div>
					<label class="label-settings mt-4">Ancien mot de passe</label>
					<el-input type="password" :maxlength="30" v-model="oldPassword" :class="request.oldPassword" @blur="checkOldPassword"></el-input>
				</div>
				<span class="bad-settings-span-input" v-if="boxOldPassword">{{ boxOldPassword }}</span>
				<div v-if="valid">
					<label class="label-settings mt-4">Nouveau mot de passe</label>
					<el-input type="password" :maxlength="30" v-model="password" :class="request.password" @blur="checkPassword"></el-input>
					<center style="margin-bottom: 20px;"><el-progress v-if="showPercentage" :percentage="percentage" :status="percentageColor"></el-progress></center>
				</div>
				<span class="bad-settings-span-input" v-if="boxPassword">{{ boxPassword }}</span>
				<div v-if="valid">
					<label class="label-settings mt-4">Confirmation du mot de passe</label>
					<el-input type="password" :maxlength="30" v-model="passwordConfirm" :class="request.passwordConfirm" @blur="checkPasswordConfirm"></el-input>
				</div>
				<span class="bad-settings-span-input" v-if="boxPasswordConfirm">{{ boxPasswordConfirm }}</span>
			</el-tab-pane>
		</el-tabs>
		<user-history :users="usersLiked" :title="'Ils vous ont \'like\'...'"/>
		<user-history :users="usersVisited" :title="'Ils vous ont rendu visite...'"/>
	</div>
</template>

<script>
	import { canvasToBlob } from 'blob-util'
	import VueGoogleAutocomplete from 'vue-google-autocomplete'
	import userHistory from "@/components/user/userHistory"

	export default {
		components: { 
			VueGoogleAutocomplete,
			userHistory
		},
		data() {
			return {
				tabPosition: 'left',
				genres: [{
					value: '1',
					label: 'Homme'
				}, {
					value: '2',
					label: 'Femme'
				}],
				genre: '',

				orientations: [{
					value: '1',
					label: 'Homme'
				}, {
					value: '2',
					label: 'Femme'
				}, {
					value: '3',
					label: 'Les deux'
				}],
				orientation: '',

				desc: '',

				dynamicTags: [],
				inputVisible: false,
				inputValue: '',

				index: 0,
				file: '',
				profilePicture: '',
				picture1: '',
				picture2: '',
				picture3: '',
				picture4: '',

				firstname: '',
				lastname: '',

				birthDate: '',
				datePickerOptions: {
					disabledDate (date) {
						return date > new Date()
					}
				},

				mail: '',
				oldPassword: '',
				valid: false,
				password: '',
				passwordConfirm: '',
				request: {
					mail: '',
					oldPassword: '',
					password: '',
					passwordConfirm: '',
					birthDate: ''
				},
				boxMail: '',
				boxOldPassword: '',
				boxPassword: '',
				boxPasswordConfirm: '',
				boxBirthDate: '',
				showPercentage: false,
				percentage: 0,
				percentageColor: "exception",

				lat: '',
				lng: '',


				usersVisited: [],
				usersLiked: [],
				user: {
					_nickName: ''
				},
				oauth: false
			}
		},

		async beforeCreate() {
			var result = await this.$store.dispatch('getUser', this.$store.state.session);
			this.genre = result.data._gender;
			this.orientation = result.data._orientation;
			this.desc = result.data._description;
			this.dynamicTags = result.data._interest ? JSON.parse(result.data._interest) : [];
			this.firstname = result.data._firstName;
			this.lastname = result.data._lastName;
			this.mail = result.data._email;
			this.birthDate = result.data._birthDate;
			this.profilePicture = result.data._profilePicture;
			this.picture1 = result.data._picture1;
			this.picture2 = result.data._picture2;
			this.picture3 = result.data._picture3;
			this.picture4 = result.data._picture4;
			this.lat = result.data._latitude
			this.lng = result.data._longitude
			this.user._nickName = result.data._nickName
			this.oauth = result.data._tokenVerif ? true : false
			this.getHistoryLikeUsers()
			this.$options.sockets.GET_DATA = (data) => {
				this.getHistoryLikeUsers()
			}
		},

		watch: {
			async 'genre' (n, o) {
				var result = await this.$store.dispatch('changeGenre', this);
			},
			async 'orientation' (n, o) {
				var result = await this.$store.dispatch('changeOrientation', this);
			},
			async 'dynamicTags' (n, o) {
				var result = await this.$store.dispatch('changeTags', this);
			},
			lat() {
				this.initMap()
			},
			lng() {
				this.initMap()
			}
		},
		
		methods: {
			async changeDesc() {
				if (this.desc) var result = await this.$store.dispatch('changeDesc', this);
			},
			async changeFirstname() {
				if (this.firstname) var result = await this.$store.dispatch('changeFirstname', this);
			},
			async changeLastname() {
				if (this.lastname) var result = await this.$store.dispatch('changeLastname', this);
			},
			async changePictures() {
				var result = await this.$store.dispatch('changePictures', this)
				if (result && !result.data.success && result.data.infos) this.handleError(result.data.infos)
			},
			async changeMail() {
				var result = await this.$store.dispatch('changeMail', this)
			},
			async changePassword() {
				var result = await this.$store.dispatch('changePassword', this)
			},
			async changeBirthDate() {
				var result = await this.$store.dispatch('changeBirthDate', this)
			},
			async changeLatitude() {
				var result = await this.$store.dispatch('changeLatitude', this)
			},
			async changeLongitude() {
				var result = await this.$store.dispatch('changeLongitude', this)
			},
			submitFiles(index) {
				this.index = index
				this.changePictures()
			},
			handleFileUpload(index) {
				if (index === 0) this.file = this.$refs.file0.files[0]
				if (index === 1) this.file = this.$refs.file1.files[0]
				if (index === 2) this.file = this.$refs.file2.files[0]
				if (index === 3) this.file = this.$refs.file3.files[0]
				if (index === 4) this.file = this.$refs.file4.files[0]
			},
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue.toLowerCase()
				if (inputValue.length > 25 || inputValue.length < 1 || this.dynamicTags.find(m => m === inputValue)) {
					return;
				} else if (inputValue && this.dynamicTags.length < 10) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			async checkMail() {
				this.request.mail = this.mail ? 'good-input' : 'bad-input';
				if (this.mail) {
					var result = await this.$store.dispatch('checkMail', this.mail);
					if (result.data) {
						this.boxMail = result.data;
						this.request.mail = 'bad-input';
					} else {
						this.boxMail = '';
						this.request.mail = 'good-input';
						this.changeMail()
					}
				}
			},
			async checkOldPassword() {
				if (this.oldPassword) {
					var result = await this.$store.dispatch('checkOldPassword', this)
					if (result.data) {
						this.request.oldPassword = 'good-input'
						this.boxOldPassword = ''
						this.valid = true
					} else {
						this.request.oldPassword = 'bad-input'
						this.boxOldPassword = 'Mot de passe erroné'
						this.valid = false
					}
				}
			},
			async checkPassword() {
				this.showPercentage = true;
				this.request.password = this.password ? 'good-input' : 'bad-input';
				if (this.password) {
					var result = await this.$store.dispatch('checkPassword', this.password);
					if (result.data) {
						var upper = /(?=.*[A-Z])/.test(this.password) ? 25 : 0,
							lower = /(?=.*[a-z])/.test(this.password) ? 25 : 0,
							mini = /[0-9a-zA-Z]{8,}/.test(this.password) ? 25 : 0,
							digit = /(?=.*\d)/.test(this.password) ? 25 : 0,
							total = upper + lower + mini + digit;
						this.percentage = total;
						this.percentageColor = "exception";
						this.boxPassword = result.data;
						this.request.password = 'bad-input';
					} else {
						this.percentage = 100;
						this.percentageColor = "success";
						this.boxPassword = "";
						this.request.password = 'good-input';
						if (this.passwordConfirm)
							this.checkPasswordConfirm()
					}
				}
			},
			checkPasswordConfirm() {
				if (!this.passwordConfirm || this.passwordConfirm !== this.password) {
					this.boxPasswordConfirm = 'Le mot de passe est différent';
					this.request.passwordConfirm = 'bad-input';
				} else {
					this.boxPasswordConfirm = "";
					this.request.passwordConfirm = 'good-input';
					this.changePassword()
				}
			},
			async checkBirthDate() {
				var result = await this.$store.dispatch('checkBirthDate', this.birthDate)
				if (result.data) {
					this.request.birthDate = ''
					this.changeBirthDate()
				} else
					this.request.birthDate = 'bad-birthdate-input'
			},
			getAddressData(addressData, placeResultData, id) {
				this.lat = addressData.latitude
				this.lng = addressData.longitude
				this.changeLatitude()
				this.changeLongitude()
			},
			initMap() {
				var position = {'lat': this.lat, 'lng': this.lng},
					map = new google.maps.Map(document.getElementById("googleMaps"), {zoom: 14, center: position, mapTypeId: 'terrain'}),
					cityCircle = new google.maps.Circle({
						strokeColor: '#409EFF',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#409EFF',
						fillOpacity: 0.35,
						map: map,
						center: position,
						radius: 1000
					});
			},
			handleError(res) {
				this.$notify({
					title: "Attention!",
					message: res,
					type: 'error'
				});
			},
			async getHistoryLikeUsers() {
				var result = await this.$store.dispatch('getVisiters', this)
				if (result) this.usersVisited = result.data
				var result = await this.$store.dispatch('getLikes', this)
				if (result) this.usersLiked = result.data
			}
		}
	}
</script>

<style scoped>
.el-tag + .el-tag {
	margin: 5px;
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
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
	margin: auto;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label {
	display: none;
}
.bad-birthdate-input {
	border: 1px solid red;
	border-radius: 4px;
}
.el-tab-pane {
	text-align: center;
}
.el-textarea {
	width: auto;
}
.el-input {
	width: auto;
}
.el-input__inner {
	width: auto;
}
.bad-settings-span-input {
	font-size: x-small;
	color: #e05b5b;
}
.el-progress.el-progress--line.is-exception {
	margin-bottom: -25px;
}
.el-progress-bar {
	width: 25%;
}
#map {
	display: inline-block;
	width: auto;
}
#googleMaps {
	width: 500px;
	height: 300px;
	margin: auto;
	margin-top: 20px
}
.el-tabs.el-tabs--left {
    padding-bottom: 50px;
    border-bottom: 1px solid lightgrey;
}
.submit > .el-form-item__content {
	margin-left: 0 !important;
}
.ul-settings {
	list-style: none;
	display: inline;
}
.register-box {
  text-align: center;
  background: #e05b5b;
  border-radius: 5px;
  padding: 10px 5px;
  margin-bottom: 15px;
  color: white;
}
.label-settings {
  font-size: 18px;
  display: block;
}
.good-input {
  border-color: #43a1e5;
  color: #43a1e5;
}
.bad-input {
  border-color: #e05b5b;
  color: #e05b5b;
}
</style>
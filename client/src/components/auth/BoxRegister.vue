<template>
	<div id="BoxRegister">
		<router-link to="/login" class="login-back"><i class="fas fa-arrow-left"></i></router-link>
        <span class="login-title">Inscription,</span>
        <p class="login-content">Vous êtes sur le point de trouver l’amour de votre vie</p>

            <div class="row">
            	<div class="col-md-6">
                    <div class="login-input" :class="request.mail">
                        <i class="fas fa-at"></i>
                        <input type="text" placeholder="Adresse mail" v-model="registerForm.mail" @blur="checkMail" @input="checkMail">
                    </div>
					<el-collapse-transition>
						<div class="register-box d-sm-block d-md-none" v-if="boxMail">
							{{ boxMail }}
						</div>
					</el-collapse-transition>
                </div>
                <div class="col-md-6">
                    <div class="login-input" :class="request.nickname">
                        <i class="fas fa-user-tag"></i>
                        <input type="text" placeholder="Pseudo" v-model="registerForm.nickname" @blur="checkNickname" @input="checkNickname">
                    </div>
					<el-collapse-transition>
						<div class="register-box d-sm-block d-md-none" v-if="boxNickname">
							{{ boxNickname }}
						</div>
					</el-collapse-transition>
                </div>
            </div>
			<el-collapse-transition>
				<div class="register-box d-none d-md-block" v-if="boxMail || boxNickname">
					<el-collapse-transition><div v-if="boxMail">{{ boxMail }}</div></el-collapse-transition>
					<hr v-if="boxMail && boxNickname">
					<el-collapse-transition><div v-if="boxNickname">{{ boxNickname }}</div></el-collapse-transition>
				</div>
			</el-collapse-transition>
            <div class="row">
            	<div class="col-md-6">
                    <div class="login-input" :class="request.lastname">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Nom" v-model="registerForm.lastname" @blur="checkLastname" @input="checkLastname">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="login-input" :class="request.firstname">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Prénom" v-model="registerForm.firstname" @blur="checkFirstname" @input="checkFirstname">
                    </div>
                </div>
            </div>
            <div class="login-input" :class="request.password">
                <i class="fas fa-key"></i>
                <input type="password" placeholder="Mot de passe" v-model="registerForm.password" @click="showPercentage = true" @blur="showPercentage = false" @input="checkPassword">
            </div>
			<center style="margin-bottom: 20px;"><el-progress v-if="showPercentage" :percentage="percentage" :status="percentageColor"></el-progress></center>
			<el-collapse-transition>
				<div class="register-box" v-if="boxPassword">
					{{ boxPassword }}
				</div>
			</el-collapse-transition>
            <div class="login-input" :class="request.passwordConfirm">
                <i class="fas fa-key"></i>
                <input type="password" placeholder="Mot de passe confirmation" v-model="registerForm.passwordConfirm" @input="checkPasswordConfirm">
            </div>
			<el-collapse-transition>
				<div class="register-box" v-if="boxPasswordConfirm">
					{{ boxPasswordConfirm }}
				</div>
			</el-collapse-transition>

			<button class="button" @click="submitForm">Inscription</button>
	</div>
</template>


<!-- Script -->
<script>
	export default {
		// Name
		name: 'BoxRegister',
		
		// Data
		data() {
			return {
				registerForm: {
					firstname: "",
					lastname: "",
					nickname: "",
					mail: "",
					password: "",
					passwordConfirm: "",
					latitude: "",
					longitude: ""
				},
				request: {
					firstname: "",
					lastname: "",
					nickname: "",
					mail: "",
					password: "",
					passwordConfirm: "",
				},
				boxMail: "",
				boxNickname: "",
				boxPassword: "",
				boxPasswordConfirm: "",
				showPercentage: false,
				percentage: 0,
				percentageColor: "exception",
			};
		},

		// Methods
		methods: {
			async submitForm() {
				if (!(this.request.nickname === "good-input" &&
					this.request.mail === "good-input" &&
					this.request.firstname === "good-input" &&
					this.request.lastname === "good-input" &&
					this.request.password === "good-input" &&
					this.request.passwordConfirm === "good-input")) {
					return this.$notify.error({
						title: 'Attention!',
						message: 'Tous les champs doivent être rempli correctement'
					});
				}
				var result = await this.$store.dispatch('register', this.registerForm);
				if (result.data._firstName) {
					this.$notify.success({
						title: "Inscription réussie!",
						message: "un mail de confirmation vous a été envoyé",
					});
					this.$router.push({ name: "login" })
				} else {
					this.success = result.data.success;
					if (!this.success) {
						this.$notify.error({
							title: 'Attention!',
							message: "Un problème est survenu durant votre inscription",
						});
						this.request.firstname = 'bad-input';
						this.request.lastname = 'bad-input';
						this.request.nickname = 'bad-input';
						this.request.mail = 'bad-input';
						this.request.password = 'bad-input';
						this.request.passwordConfirm = 'bad-input';
					}
				}
			},
			async checkMail() {
				this.request.mail = this.registerForm.mail ? 'good-input' : 'bad-input';
				if (this.registerForm.mail) {
					var result = await this.$store.dispatch('checkMail', this.registerForm.mail);
					if (result.data) {
						this.boxMail = result.data;
						this.request.mail = 'bad-input';
					} else {
						this.boxMail = "";
						this.request.mail = 'good-input';
					}
				}
			},
			async checkNickname() {
				this.request.nickname = this.registerForm.nickname ? 'good-input' : 'bad-input';
				if (this.registerForm.nickname) {
					var result = await this.$store.dispatch('checkNickname', this.registerForm.nickname);
					if (result.data) {
						this.boxNickname = result.data;
						this.request.nickname = 'bad-input';
					} else {
						this.boxNickname = "";
						this.request.nickname = 'good-input';
					}
				}
			},
			checkLastname() {
				this.request.lastname = this.registerForm.lastname ? 'good-input' : 'bad-input';
			},
			checkFirstname() {
				this.request.firstname = this.registerForm.firstname ? 'good-input' : 'bad-input';
			},
			async checkPassword() {
				this.showPercentage = true;
				this.request.password = this.registerForm.password ? 'good-input' : 'bad-input';
				if (this.registerForm.password) {
					var result = await this.$store.dispatch('checkPassword', this.registerForm.password);
					if (result.data) {
						var upper = /(?=.*[A-Z])/.test(this.registerForm.password) ? 25 : 0,
							lower = /(?=.*[a-z])/.test(this.registerForm.password) ? 25 : 0,
							mini = /[0-9a-zA-Z]{8,}/.test(this.registerForm.password) ? 25 : 0,
							digit = /(?=.*\d)/.test(this.registerForm.password) ? 25 : 0,
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
						if (this.registerForm.passwordConfirm)
							this.checkPasswordConfirm();
					}
				}
			},
			checkPasswordConfirm() {
				if (!this.registerForm.passwordConfirm || this.registerForm.passwordConfirm !== this.registerForm.password) {
					this.boxPasswordConfirm = 'Le mot de passe est différent';
					this.request.passwordConfirm = 'bad-input';
				} else {
					this.boxPasswordConfirm = "";
					this.request.passwordConfirm = 'good-input';
				}
			},
		},
		
	}
</script>

<style scoped>
.button {
  width: 180px;
  height: 38px;
  border-radius: 50px;
  -webkit-transition: box-shadow 0.2s ease;
  -webkit-transition: -webkit-box-shadow 0.2s ease;
  transition: -webkit-box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease, -webkit-box-shadow 0.2s ease;
  -webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.13);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.13);
  background-image: linear-gradient(99deg, #43a1e5 0%, #7aa6c6 100%);
  text-align: center;
  border: none;
  clear: both;
  margin: 0 auto;
  margin-top: 80px;
  display: block;
  /* Text */
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
}

.button:hover {
  -webkit-box-shadow: 0 12px 15px rgba(0, 0, 0, 0.25);
          box-shadow: 0 12px 15px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.button:focus {
  outline: none;
}

.button:disabled, button[disabled] {
  background-image: #868686;
}
.login {
  position: relative;
  top: 50vh;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  min-width: 300px;
}

.login-title {
  color: #707070;
  font-size: 42px;
  display: block;
  margin-bottom: -10px;
}

.login-content {
  color: #a3a3a3;
  font-size: 14px;
  margin-left: 3px;
  margin-bottom: 50px;
}

.login-input {
  border-bottom: 2px solid #a3a3a3;
  padding: 6px 0px;
  margin: 5px;
  margin-bottom: 30px;
  width: auto;
  color: #bebebe;
}

.good-input {
  border-color: #43a1e5;
  color: #43a1e5;
}

.bad-input {
  border-color: #e05b5b;
  color: #e05b5b;
}

.login-input > input:focus {
  color: #8d8d8d;
  outline: none;
}

.login-input > input, input::-webkit-input-placeholder {
  color: #bebebe;
  font-size: 16px;
  border: none;
  width: 80%;
}

.login-input > input, input:-ms-input-placeholder {
  color: #bebebe;
  font-size: 16px;
  border: none;
  width: 80%;
}

.login-input > input, input::-ms-input-placeholder {
  color: #bebebe;
  font-size: 16px;
  border: none;
  width: 80%;
}

.login-input > input, input::placeholder {
  color: #bebebe;
  font-size: 16px;
  border: none;
  width: 80%;
}

.login-input > .fas {
  font-size: 16px;
  margin-right: 10px;
}

.login-register {
  color: #43a1e5;
  font-size: 14px;
  padding-left: 4px;
  margin-top: 30px;
}

.login-forget {
  color: #43a1e5;
  font-size: 14px;
  float: right;
}

.login-bg {
  position: absolute;
  top: 50vh;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  min-width: 300px;
  margin: 0 auto;
}
.register-box {
  text-align: center;
  background: #e05b5b;
  border-radius: 5px;
  padding: 10px 5px;
  margin-bottom: 15px;
  color: white;
}
</style>


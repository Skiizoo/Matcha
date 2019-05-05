<template>
	<div>
		<router-link to="/login" class="login-back"><i class="fas fa-arrow-left"></i></router-link>
    <span class="login-title">Réinitialisation</span>
    <p class="login-content">Merci de saisir votre nouveau mot de passe</p>
		<div class="login-input" :class="request.password">
      <i class="fas fa-key"></i>
      <input type="password" placeholder="Mot de passe" v-model="password" @click="showPercentage = true" @blur="showPercentage = false" @input="checkPassword">
  	</div>
		<center style="margin-bottom: 20px;"><el-progress v-if="showPercentage" :percentage="percentage" :status="percentageColor"></el-progress></center>
		<el-collapse-transition>
			<div class="register-box" v-if="boxPassword">
				{{ boxPassword }}
			</div>
		</el-collapse-transition>
    <div class="login-input" :class="request.passwordConfirm">
      <i class="fas fa-key"></i>
      <input type="password" placeholder="Mot de passe confirmation" v-model="passwordConfirm" @input="checkPasswordConfirm">
  	</div>
		<el-collapse-transition>
			<div class="register-box" v-if="boxPasswordConfirm">
				{{ boxPasswordConfirm }}
			</div>
		</el-collapse-transition>

		<button class="button" @click="forgot">Réinitialiser</button>
	</div>
</template>

<script>
	export default {
		// Name
        name: 'BoxChangePass',
        // Data
        data() {
          return {
						password: "",
						passwordConfirm: "",
						request: {
							password: "",
							passwordConfirm: ""
						},
						boxPassword: "",
						boxPasswordConfirm: "",
						showPercentage: false,
						percentage: 0,
						percentageColor: "exception",
          }
        },

        // Method
        methods: {
          async forgot(formName) {
						if (this.request.password !== "good-input" || this.request.passwordConfirm !== "good-input") {
							return this.$notify.error({
								title: 'Attention!',
								message: 'Vos saisies sont incorrectes',
							});
						}
						var result = await this.$store.dispatch('changePass', this);
						if (result.data) {
							this.$notify.error({
								title: 'Attention!',
								message: result.data,
							});
						} else {
							this.$notify.success({
								title: "C'est confirmé!",
								message: "ton mot de passe a été mis à jour",
							});
							this.$router.push({ name: 'login'});
						}
					},
					async checkPassword() {
						this.showPercentage = true;
						this.request.password = this.password ? 'good-input' : 'bad-input';
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
								this.checkPasswordConfirm();
						}
					},
					checkPasswordConfirm() {
						if (this.passwordConfirm !== this.password) {
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

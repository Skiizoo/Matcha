<template>
	<div>
		<router-link to="/login" class="login-back"><i class="fas fa-arrow-left"></i></router-link>
    <span class="login-title">Mot de passe oublié ?</span>
    <p class="login-content">Merci de saisir votre adresse mail</p>
		<div class="login-input" :class="requestMail">
      <i class="fas fa-at"></i>
      <input type="text" placeholder="Adresse mail" v-model="mail" @blur="checkMail">
    </div>
		<el-collapse-transition>
			<div class="register-box" v-if="boxMail">
				{{ boxMail }}
			</div>
		</el-collapse-transition>

		<button class="button" @click="forgot">Réinitialiser</button>
	</div>
</template>

<script>
	export default {
		// Name
        name: 'BoxForgot',
        // Data
        data() {
          return {
						mail: "",
						boxMail: "",
						requestMail: "",
          }
        },

        // Method
        methods: {
          async forgot(formName) {
						this.checkMail();
						if (this.requestMail !== "good-input") {
							return this.$notify.error({
								title: 'Attention!',
								message: 'Ce mail n\'est associé à aucun compte',
							});
						}
						var result = await this.$store.dispatch('forgotPass', this.mail);
						if (result.data) {
							this.$notify.success({
								title: "C'est confirmé!",
								message: "un mail vous a été envoyé",
							});
						} else {
							this.$notify.error({
								title: 'Attention!',
								message: "Un problème est survenu durant votre réinintialisation",
							});
						}
					},
					async checkMail() {
            this.requestMail = this.mail ? 'good-input' : 'bad-input';
            if (this.mail) {
              var result = await this.$store.dispatch('checkMail', this.mail);
              if (result.data === `Le mail "${this.mail}" est déjà utilisé` || result.data === null) {
                this.boxMail = "";
                this.requestMail = 'good-input';
              } else {
                this.boxMail = result.data;
                this.requestMail = 'bad-input';
              }
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

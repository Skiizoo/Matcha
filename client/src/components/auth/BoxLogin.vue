<template>
	<div id="BoxLogin">
		<p class="login-title">Bienvenue,</p>
		<p class="login-content">Merci de vous identifier pour accéder au site.</p>

		<div class="login-input" :class="request.login">
			<i class="fas fa-user-tag"></i>
			<input type="text" placeholder="Pseudo" @keypress.enter="login" v-model="user.login" @blur="checkNickname" @input="checkNickname">
		</div>
		<div class="login-input" :class="request.password">
			<i class="fas fa-key"></i>
			<input type="password" placeholder="Mot de passe" @keypress.enter="login" v-model="user.password" @blur="checkPassword" @input="checkPassword">
		</div>

		<router-link to="/register" class="login-register">Inscription</router-link>
		<router-link to="/forgotPass" class="login-forget">Mot de passe oublié ?</router-link>
		<ul class="connexion">
			<li>
				<a href='https://api.intra.42.fr/oauth/authorize?client_id=01dac0c084ae2a6ac29ee0a880d2769e731682b34478bd75a8849dfd1650f08c&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2F42&response_type=code'>Le101</a>
			</li>
			<li>
				<a href='https://github.com/login/oauth/authorize?client_id=a92145361450ff616ae0'>GitHub</a>
			</li>
		</ul>
		<button class="button" @click="login">Connexion</button>
	</div>
</template>

<script>
	import BoxForgot from '@/components/auth/BoxForgot.vue'

	export default {
		name: 'BoxLogin',
			
		components: {
			BoxForgot
		},

		data () {
			return {
				user: {
					login: '',
					password: '',
				},
				request: {
					login: '',
					password: '',
				},
				oauthMethod: '',
				oauthCode: '',
				api: false,
			}
		},

		async beforeCreate() {
			if (this.$route.params.oauthCode) {
				this.oauthCode = this.$route.params.oauthCode
				this.oauthMethod = this.$route.params.oauthMethod
				var result = await this.$store.dispatch('loginOauth', this)
				if (result.data.state) {
					if (!result.data.isUser) var res = await this.$store.dispatch('registerByApi', result.data.data)
					this.user.login = result.data.data.nickname
					this.api = true
					this.login()
				}
			}
		},

		created() {
			if (this.$route.params.login) this.user.login = this.$route.params.login;
		},

		methods: {
			async login() {
				if (user.login && user.password) {
					var result = await this.$store.dispatch('login', this);
					if (result && result.data.success) {
						localStorage.setItem('authenticatedToken', result.data.authenticatedToken)
						this.$socket.emit('USER_LOGIN', result.data.id);
						this.$notify({
							title: "Connexion réussie",
							message: "Bienvenue sur Matcha",
							type: 'success'
						});
						this.$router.push({ name: 'home'});
					} else {
						var res = result.data.res;
						this.success = result.data.success;
						if (!this.success) {
							this.$notify({
								title: "Attention!",
								message: res,
								type: 'error'
							});
							this.request.login = 'bad-input';
							this.request.password = 'bad-input';
						}
					}
				}
			},
			checkNickname() {
				this.request.login = this.user.login ? 'good-input' : 'bad-input';
			},
			checkPassword() {
				this.request.password = this.user.password ? 'good-input' : 'bad-input';
			}
		}
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

.connexion {
    text-align: center;
    margin-top: 80px;
    list-style: none;
}

.connexion li {
	display: inline-flex;
}

.connexion li a {
	color: #707070;
	padding-right: 20px;
	text-decoration: none;
}
</style>


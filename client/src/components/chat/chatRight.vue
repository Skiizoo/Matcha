<template>
	<div class="col-lg-7 chat-right col-md-12">
		<transition-group name="list" tag="div" id="chat-group" class="chat-group">
			<p v-for="message in messages" :key="message.id" :class="message.type">
				{{ message.content }}
			</p>
		</transition-group>
		<div class="chat-send" v-if="id">
			<input type="search" v-model="msg" placeholder="Ecrire un message..." @keypress.enter="sendMessage">
			<i class="fas fa-paper-plane" @click="sendMessage"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				messages: [],
				msg: "",
				exp: '',
				dest: '',
			}
		},
		mounted() {
			this.id = this.$route.query.id;
			this.getMessages();
			this.$options.sockets.MESSAGE = async (data) => {
				if (data.conversation !== parseInt(this.$route.query.id)) return;
				if (data.message.id === this.messages[this.messages.length - 1].id) return;
				data.message.type = "chat-dest";
				this.messages.push(data.message);
			}
			var element = document.getElementById('chat-group');
      element.scrollTop = element.scrollHeight;
		},
		updated() {
			var element = document.getElementById('chat-group');
			element.scrollTop = element.scrollHeight;
		},
		watch: {
			async '$route.query.id' (n, o) {
				this.id = n;
				this.getMessages();
			},
		},
		methods: {
			async getMessages() {
        if (this.id) var response = await this.$store.dispatch('getMessages', this.id);
        else this.messages = []
				if (response) this.messages = await this.structMessages(response.data);
			},
			async structMessages(messages) {
				var structMessages = [], 
						id = 0;
				messages.forEach(message => {
					var struct = {
						id: id++,
						type: null,
						content: message.content
					}
					struct.type = this.$store.state.session === message.nickname_user ? "chat-exp" : "chat-dest";
					structMessages.push(struct);
				});

				return structMessages;
			},
			async sendMessage() {
        this.exp = this.$store.state.session
				this.dest = this.$store.state.session === this.$route.query.u1 ? this.$route.query.u2 : this.$route.query.u1
				var	conversation = parseInt(this.$route.query.id),
				response = await this.$store.dispatch('sendMessage', this);

				if (!response) return;
				var struct = {
					id: this.messages.length + 1,
					type: "chat-exp",
					content: this.msg
				}

				this.$socket.emit('SEND_MESSAGE', { message: struct, conversation: conversation, dest: this.dest, exp: this.exp, });
				this.messages.push(struct);
        this.msg = "";
        
        var user = await this.$store.dispatch('getUser', this.dest)
				this.$socket.emit('NOTIFS', { userNotified: user.data.id })
			}
		}
	}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-50px);
}
.chat {
  margin-bottom: 20px;
}

.chat-menu {
  width: 100%;
  max-height: 80vh;
  overflow-y: scroll;
}

.chat-item {
  background: white;
  height: 96px;
  width: 100%;
  border-radius: 5px;
  padding: 13px 16px;
  -webkit-box-shadow: 0 12px 15px rgba(77, 77, 77, 0.082);
          box-shadow: 0 12px 15px rgba(77, 77, 77, 0.082);
  margin-bottom: 20px;
  overflow: hidden;
}

.chat-user-img {
  width: 70px;
  height: 70px;
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  margin-right: 10px;
  float: left;
}

.chat-user-name {
  line-height: 65px;
  color: #454545;
  font-size: 16px;
  font-weight: 500;
  line-height: 27px;
}

.chat-user-message {
  height: 30px;
  color: #bebebe;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.chat-menu #active {
  -webkit-box-shadow: 0 12px 15px rgba(237, 164, 91, 0.23);
          box-shadow: 0 12px 15px rgba(237, 164, 91, 0.23);
  border-radius: 5px;
  background-color: #eda45b;
  color: white;
}

.chat-right {
  overflow: inherit;
  height: 80vh;
  width: 100%;
}

.chat-right > .chat-send {
  margin: 20px 0;
  width: 100%;
  padding: 20px 30px;
  -webkit-box-shadow: 0 12px 15px rgba(0, 0, 0, 0.05);
          box-shadow: 0 12px 15px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #ffffff;
}

.chat-send > input {
  border: none;
  height: 50px;
  width: 80%;
}

.chat-send > input::-webkit-input-placeholder {
  color: #d0d0d0;
}

.chat-send > input:-ms-input-placeholder {
  color: #d0d0d0;
}

.chat-send > input::-ms-input-placeholder {
  color: #d0d0d0;
}

.chat-send > input::placeholder {
  color: #d0d0d0;
}

.chat-send > input:focus {
  outline: none;
}

.chat-send > .fas {
  margin-top: 15px;
  float: right;
  color: #bebebe;
  font-size: 22px;
}

.chat-group {
  height: 72vh;
  overflow-y: scroll;
  padding-right: 15px;
  font-size: 14px;
}

.chat-group > .chat-dest {
  background: #f8f8f8;
  width: auto;
  max-width: 600px;
  padding: 15px 20px;
  border-radius: 30px;
  color: #454545;
  clear: both;
  float: left;
}

.chat-group > .chat-exp {
  background-color: #eda45b;
  display: block;
  width: auto;
  max-width: 600px;
  padding: 15px 20px;
  border-radius: 30px;
  color: white;
  clear: both;
  float: right;
}
</style>
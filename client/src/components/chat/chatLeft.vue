<template>
	<transition-group name="flip-list" tag="div" class="col-lg-5 chat-menu col-12">
		<div  v-for="conversation in conversations" :key="conversation.id"  class="chat-item" :id="[ aConv === conversation.id ? 'active' : '']" @click="setConv(conversation.id)">
			<div class="chat-user-img" :style="{ backgroundImage: 'url(' + conversation.user._profilePicture + ')' }"></div>
			<div class="chat-text">    
				<div class="chat-user-name" :id="[ aConv === conversation.id ? 'active' : '' ]">
					{{ conversation.user._lastName }} {{ conversation.user._firstName }}
				</div>
				<div class="chat-user-message" :id="[ aConv === conversation.id ? 'active' : '' ]">
					{{ conversation.lastMessage.me }}{{ conversation.lastMessage.content}}
				</div>
			</div>
		</div>
	</transition-group>
</template>

<script>
	export default {
		data() {
			return {
				conversations: [],
				aConv: 1,
				n : ''
			}
		},
		props: [
			"user",
		],
		watch: {
			async "user" (n) {
				var result = await this.$store.dispatch('getConversations', this);
				this.blocks = n._block ? JSON.parse(n._block) : null;
				this.mountConversation(result.data);
			}
		},
		mounted() {
			this.$options.sockets.MESSAGE = async (data) => {
				for ( var i = 0 ; this.conversations.length > i ; i++) {
					if (this.conversations[i].id === data.conversation) {
						this.conversations[i].lastMessage.me = this.$store.state.session === data.exp ? "Vous : " : "";
						this.conversations[i].lastMessage.content = data.message.content;
						
						var conv = this.conversations[i];
						this.conversations.splice(i, 1);
						this.conversations.splice(0, 0, conv);
						break;
					}
				}
			}

			this.$options.sockets.GET_USRMSG = async (data) => {
				this.conversations = []
				var result = await this.$store.dispatch('getConversations', this);
				this.mountConversation(result.data);
			}
		},
		methods: {
			mountConversation(conversations) {
				if (!conversations[0]) return;

				var i = 0;
				conversations.forEach(async conv => {
						var result = {
							id: conv.id,
							lastMessage: {
							me: null,
							content: "",
						}
					};

					if (this.blocks && (this.blocks.indexOf(conv.nickname1) >= 0 || this.blocks.indexOf(conv.nickname2) >= 0)) return;

					if (this.blocks && (this.blocks.indexOf(conv.nickname1) >= 0 || this.blocks.indexOf(conv.nickname2) >= 0)) return;


					result.nickname = conv.nickname1 === this.$store.state.session ? conv.nickname2 : conv.nickname1;
					
					this.user._nickName = result.nickname
					var res = await this.$store.dispatch('isRelation', this)
					if (!res.data) {
							this.$router.push({ name: 'chat'});
							return;
						}

					var response = await this.$store.dispatch('getUser', result.nickname);
					result.user = response.data;

					var tmp = result.user._block
					if (tmp) 
						if (tmp.indexOf(this.$store.state.session) >= 0) {
							this.$router.push({ name: 'chat'});
							return;
						}

					var response = await this.$store.dispatch('lastMessage', conv.id);
					result.lastMessage.me = response.data.nickname_user === this.$store.state.session ? "Vous : " : "";
					result.lastMessage.content = response.data.content || "Aucun message";

					this.conversations.push(result);

					if (i++ === 0) this.setConv(result.id);
				});
			},
			setConv(id) {
				this.aConv = id;
				this.conversations.forEach(conversation => {
					if (conversation.id === id) {
						this.$router.replace({ query: {id: id, u1: conversation.nickname, u2: this.$store.state.session}});
					}
				})
			}
		}
	}
</script>

<style scoped>
.flip-list-move {
	transition: transform .5s;
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
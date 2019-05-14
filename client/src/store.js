import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const ip = "XXXXXX";

Vue.use(Vuex);

const state = {
  session: null,
  id: null,
  search: "",
  userBlock: false,
  quitSearch: false,
};

const mutations = {
  changeUser (state, data) {
    state.session = data.login;
    state.id = data.id;
  }
};

const actions = {
  login: async (store, vue) => {
    let uri = `http://${ip}/users/login`;
    try {
      var result = await axios.post(uri, { user: vue.user, api: vue.api });
      if (result.data.success) {
        vue.$session.set('user', result.data.nickname.toLowerCase());
        vue.$session.set('id', result.data.id);
        store.commit('changeUser', { id: result.data.id, login: result.data.nickname.toLowerCase() });
      }
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  disconnect: async (store, vue) => {
    try {
      vue.$session.remove('user');
      vue.$session.remove('id');
      localStorage.removeItem('authenticatedToken')
      store.state.session = null;
      store.state.id = null;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  register: async (store, user) => {
    let uri = `http://${ip}/users/register`;
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          user.latitude = position.coords.latitude
          user.longitude = position.coords.longitude
          var result = await axios.post(uri, user);
          return result;
        }, async function (error) {
          var result = await axios.post(uri, user);
          return result;
        })
      }
      var result = await axios.post(uri, user);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  checkMail: async (store, mail) => {
    let uri = `http://${ip}/users/checkMail`;
    try {
      var result = await axios.post(uri, { 'mail': mail });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  checkNickname: async (store, nickname) => {
    let uri = `http://${ip}/users/checkNickname`;
    try {
      var result = await axios.post(uri, { 'nickname': nickname });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  checkPassword: async (store, password) => {
    let uri = `http://${ip}/users/checkPassword`;
    try {
      var result = await axios.post(uri, { 'password': password });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  checkOldPassword: async (store, vue) => {
    let uri = `http://${ip}/users/checkOldPassword`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, password: vue.oldPassword });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  forgotPass: async (store, mail) => {
    let uri = `http://${ip}/users/forgotPass`;
    try {
      var result = await axios.post(uri, { 'mail': mail });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  activate: async (store, vue) => {
    let uri = `http://${ip}/users/activate`;
    try {
      var result = await axios.post(uri, vue.$route.params);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changePass: async (store, vue) => {
    let uri = `http://${ip}/users/changePass`;
    try {
      var user = {
        password: vue.password,
        key: vue.$route.query.key,
        nickname: vue.$route.query.nickname
      };
      var result = await axios.post(uri, user);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changePassword: async (store, vue) => {
    let uri = `http://${ip}/users/changePassword`;
    try {
      var result = await axios.post(uri, { password: vue.passwordConfirm, nickname: vue.user._nickName, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeGenre: async (store, vue) => {
    let uri = `http://${ip}/users/changeGenre`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, genre: vue.genre, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeOrientation: async (store, vue) => {
    let uri = `http://${ip}/users/changeOrientation`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, orientation: vue.orientation, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeDesc: async (store, vue) => {
    let uri = `http://${ip}/users/changeDesc`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, desc: vue.desc, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeFirstname: async (store, vue) => {
    let uri = `http://${ip}/users/changeFirstname`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, firstname: vue.firstname, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeLastname: async (store, vue) => {
    let uri = `http://${ip}/users/changeLastname`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, lastname: vue.lastname, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeTags: async (store, vue) => {
    let uri = `http://${ip}/users/changeTags`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, tags: vue.dynamicTags, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changeMail: async (store, vue) => {
    let uri = `http://${ip}/users/changeMail`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, mail: vue.mail, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getUser: async (store, user) => {
    let uri = `http://${ip}/users/getUser`;
    try {
      var result = await axios.post(uri, {user: user, nickname: store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getUserByAuthToken: async (store) => {
    let uri = `http://${ip}/users/getUserByAuthToken`;
    try {
      var result = await axios.post(uri, { authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  addLike: async (store, vue) => {
    let uri = `http://${ip}/users/addLike`;
    try {
      var result = await axios.post(uri, {user: vue.$store.state.session, like: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  removeLike: async (store, vue) => {
    let uri = `http://${ip}/users/removeLike`;
    try {
      var result = await axios.post(uri, {user: vue.$store.state.session, like: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  isLike: async (store, vue) => {
    let uri = `http://${ip}/users/isLike`;
    try {
      var result = await axios.post(uri, {user: vue.$store.state.session, like: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  likeYou: async (store, vue) => {
    let uri = `http://${ip}/users/isLike`;
    try {
      var result = await axios.post(uri, {user: vue.user._nickName, like: vue.$store.state.session, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  isRelation: async (store, vue) => {
    let uri = `http://${ip}/users/isRelation`;
    try {
      var result = await axios.post(uri, {user1: vue.$store.state.session, user2: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  sendRate: async (store, vue) => {
    let uri = `http://${ip}/users/sendRate`;
    try {
      var result = await axios.post(uri, {rate: vue.rate, user1: vue.$store.state.session, user2: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  isRate: async (store, vue) => {
    let uri = `http://${ip}/users/isRate`;
    try {
      var result = await axios.post(uri, {user1: vue.$store.state.session, user2: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getRates: async (store, vue) => {
    let uri = `http://${ip}/users/getRates`;
    try {
      var result = await axios.post(uri, {user: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  lastVisit: async (store, nickname) => {
    let uri = `http://${ip}/users/lastVisit`;
    try {
      var result = await axios.post(uri, {nickname: nickname, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getOnline: async (store, nickname) => {
    let uri = `http://${ip}/users/getOnline`;
    try {
      var result = await axios.post(uri, {nickname: nickname, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getConversation: async (store, vue) => {
    let uri = `http://${ip}/chat/getConversation`;
    try {
      var result = await axios.post(uri, {user1: vue.$store.state.session, user2: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getConversations: async (store, vue) => {
    let uri = `http://${ip}/chat/getConversations`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  createConversation: async (store, vue) => {
    let uri = `http://${ip}/chat/createConversation`;
    try {
      var result = await axios.post(uri, {user1: vue.$store.state.session, user2: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  lastMessage: async (store, id) => {
    let uri = `http://${ip}/chat/lastMessage`;
    try {
      var result = await axios.post(uri, {id: id, nickname: store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getMessages: async (store, id) => {
    let uri = `http://${ip}/chat/getMessages`;
    try {
      var result = await axios.post(uri, {id: id, nickname: store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  sendMessage: async (store, vue) => {
    let uri = `http://${ip}/chat/sendMessage`;
    try {
      var result = await axios.post(uri, {message: vue.msg, id: vue.id, nickname: vue.$store.state.session, dest: vue.dest, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getSearchedUsers: async (store, vue) => {
    let uri = `http://${ip}/users/getSearchedUsers`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, search: vue.search, sort: vue.sort, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  
  checkBirthDate: async (store, birthDate) => {
    let uri = `http://${ip}/users/checkBirthDate`;
    try {
      var result = await axios.post(uri, { nickname: store.state.session, birthDate: birthDate, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  
  changeBirthDate: async (store, vue) => {
    let uri = `http://${ip}/users/changeBirthDate`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, birthDate: vue.birthDate, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  
  getRecommandedUsers: async (store, vue) => {
    let uri = `http://${ip}/users/getRecommandedUsers`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, sort: vue.sort, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  
  getSortedUsers: async (store, vue) => {
    let uri = `http://${ip}/users/getSortedUsers`;
    try {
      var result = await axios.post(uri, { users: vue.saveProfils, nickname: vue.$store.state.session, sort: vue.sort, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  changeLatitude: async (store, vue) => {
    let uri = `http://${ip}/users/changeLatitude`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, latitude: vue.lat, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  changeLongitude: async (store, vue) => {
    let uri = `http://${ip}/users/changeLongitude`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, longitude: vue.lng, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getNotifications: async (store, vue) => {
    let uri = `http://${ip}/users/getNotifications`;
    try {
      var result = await axios.post(uri, {nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  setNotificationsToNull: async (store, id) => {
    let uri = `http://${ip}/users/setNotificationsToNull`;
    try {
      var result = await axios.post(uri, {id: id, nickname: store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  addBlock: async (store, vue) => {
    let uri = `http://${ip}/users/addBlock`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, block: vue.user._nickName, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  removeBlock: async (store, vue) => {
    let uri = `http://${ip}/users/removeBlock`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, block: vue.user._nickName, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getBlocks: async (store, nickname) => {
    let uri = `http://${ip}/users/getBlocks`;
    try {
      var result = await axios.post(uri, { nickname: nickname, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  reportUser: async (store, vue) => {
    let uri = `http://${ip}/users/reportUser`;
    try {
      var result = await axios.post(uri, { emitter: vue.$store.state.session, receiver: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getReportedUser: async (store, vue) => {
    let uri = `http://${ip}/users/getReportedUser`;
    try {
      var result = await axios.post(uri, { emitter: vue.$store.state.session, receiver: vue.user._nickName, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  addVisiters: async (store, vue) => {
    let uri = `http://${ip}/users/addVisiters`;
    try {
      var result = await axios.post(uri, { hosts: vue.user._nickName, visiter: vue.$store.state.session, nickname: vue.$store.state.session, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getVisiters: async (store, vue) => {
    let uri = `http://${ip}/users/getVisiters`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session, hosts: vue.user._nickName, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getLikes: async (store, vue) => {
    let uri = `http://${ip}/users/getLikes`;
    try {
      var result = await axios.post(uri, { nickname: vue.$store.state.session,hosts: vue.user._nickName, authenticatedToken: localStorage.getItem('authenticatedToken') });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  changePictures: async (store, vue) => {
    let uri = `http://${ip}/users/changePictures`;
    let formData = new FormData();
    formData.append('file', vue.file);
    formData.append('user', vue.$store.state.session);
    formData.append('index', vue.index)
    try {
      var result = await axios.post(uri, formData, { headers: { 'Content-Type' : 'multipart/form-data' } });
      return result
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  loginOauth: async (store, vue) => {
    let uri = `http://${ip}/login/` + vue.oauthMethod
    try {
      var result = await axios.post(uri, { oauthCode: vue.oauthCode })
      return result
    } catch (err) {
      console.log(err)
      return false
    }
  },
  registerByApi: async (store, user) => {
    let uri = `http://${ip}/users/registerByOauth`;
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          user.latitude = position.coords.latitude
          user.longitude = position.coords.longitude
          var result = await axios.post(uri, user);
          return result;
        }, async function (err) {
          if (err) {
            var result = await axios.post(uri, user);
            return result;
          }
        })
      }
      var result = await axios.post(uri, user);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
})

export default store

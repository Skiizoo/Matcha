<template>
    <div>
        <h4>{{ title }}</h4>
		<el-carousel v-if="users.length > 0" :interval="4000" type="card" height="365px">
			<el-carousel-item v-for="user in users" :key="user.nickName">
				<router-link :to="{ path: `/user?n=${user.nickName}`}">
                    <img :src="user.profilePicture ? user.profilePicture : '/img/no-avatar.png'" class="image"/>
                    <div class="figcaption-container">
                        <figcaption>
                            <h5>{{ user.nickName }}</h5>
                        </figcaption>
                    </div>
				</router-link>
			</el-carousel-item>
		</el-carousel>
        <p v-else>
            {{ message }}
        </p>
    </div>
</template>

<script>
	export default {
		props: [
			'users',
			'title'
        ],
        data() {
			return {
                message: ''
            }
        },
        watch: {
            async 'users' (n) {
                this.message = this.title === 'Ils vous ont \'like\'...' ? 'Désolé, personne ne vous a \'like\'' : 'Désolé, personne ne vous a rendu visite...'
            }    
        }
	}
</script>

<style scoped>
.el-carousel.el-carousel--card {
	margin-top: 50px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.is-in-stage {
    text-align: center;
}
h4 {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 50px;
}
.image {
    height: 365px;
    width: 285px;
}
a:hover figcaption {
	opacity: 1;
	top: -100%;
}
figcaption {
    opacity: 0;
    position: absolute;
    height: 365px;
    width: 285px;
    background: rgba(64,158,255,.1);
    color: #fff;
    -webkit-transition: all .9s ease;
    transition: all .9s ease;
    text-align: center;
    left: -50%
}
figcaption h5 {
    font-family: 'Open sans';
    font-weight: 400;
    padding: 10px 20px;
    margin-bottom: 0;
    position: relative;
    font-size: 30px;
    top: 12%;
    color: white !important;
}
.figcaption-container {
    position: absolute;
	left: 50%;
    height: 365px;
    width: 285px;
}
p {
    text-align: center;
}
</style>


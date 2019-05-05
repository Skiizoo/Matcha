<template>
    <main role="main" class="home container">
        <box-activate :success="success" :res="res"/>
    </main>
</template>

<script>
// @ is an alias to /src
import BoxActivate from '@/components/auth/BoxActivate.vue'

export default {
    name: 'Activate',
    data () {
        return {
            success: "success",
            res: null,
        }
    },
    async beforeCreate() {
				var result = await this.$store.dispatch('activate', this),
						nickname = this.$route.params.nickname;

				if (!result.data.success) this.success = "error";
				this.res = result.data.res;
    },
    components: {
        BoxActivate,
    }
}
</script>

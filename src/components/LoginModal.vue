<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                        type="email"
                        v-model="email"
                        placeholder="Your email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Your password"
                        required>
                    </b-input>
                </b-field>

                <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.onCancel()">Close</button>
                <button class="button is-primary" @click="login">Login</button>
            </footer>
        </div>
    </form>
</template>

<script>
import {AUTH_REQUEST} from '@/store/actions/auth'

export default {
    data() {
        return{
            email: "",
            password: "",
        }
    },
    mounted: function(){
        this.$root.$on('closeLoginModal',()=>{this.$parent.close()})
    },
    methods: {
        login: function () {
            const { email, password } = this
            this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                this.$router.push('/')
            })
        }
    }

}
</script>
<template>
    <nav class="navbar is-transparent has-shadow">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item immersify-brand is-size-3">
                {{title}}
            </router-link> 
            <div class="navbar-burger burger" :class="{'is-active':menuOpen}" data-target="navbarExampleTransparentExample" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active':menuOpen}">
            <div class="navbar-start">
            
            </div>

            <div class="navbar-end">
                <router-link to="/about" class="navbar-item">About</router-link>  
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="/documentation/overview/start/">
                    Go
                    </a>
                    <div class="navbar-dropdown is-boxed">
                    <a class="navbar-item" href="/documentation/overview/start/">
                        Overview
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                        Modifiers
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                        Columns
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                        Layout
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                        Form
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                        Elements
                    </a>
                    <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                        Components
                    </a>
                    </div>
                </div>
                <div class="navbar-item">
                    <p class="control">
                        <router-link v-if="!isAuthenticated" class="button is-primary" to="/login">
                            Login
                        </router-link>
                        <router-link v-if="isAuthenticated" class="button is-primary" to="/logout">
                            Logout
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: "NavBar",
    data() {
        return {
            title: "immersify",
            menuOpen: false
        }
    },
    methods: {
        toggleMenu(){
            this.menuOpen = !this.menuOpen
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lobster');

.immersify-brand{
    font-family: "Lobster";
}
</style>
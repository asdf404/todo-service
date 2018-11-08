<template>
  <div class="row">
    <div class="col-2" />
    <div class="card col-4">
      <div class="card-body">
        <h4 class="card-title">Login</h4>
        <b-form method="post" action="/api/v1/auth/login" @submit.prevent="login">
          <b-form-group label="Username:" label-for="login-username">
            <b-form-input id="login-username" v-model="form.username" type="text" required placeholder="Username" />
          </b-form-group>
          <b-form-group label="Password:" label-for="login-password">
            <b-form-input id="login-password" v-model="form.password" type="password" required placeholder="Password" />
          </b-form-group>
          <b-button type="submit" variant="success">Login</b-button>
        </b-form>
      </div>
    </div>
    <div class="card col-4">
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <b-form method="post" action="/api/v1/auth/login" @submit.prevent="register">
          <b-form-group label="Username:" label-for="register-username">
            <b-form-input id="register-username" v-model="form.username" type="text" required placeholder="Username" />
          </b-form-group>
          <b-form-group label="Password:" label-for="register-password">
            <b-form-input id="register-password" v-model="form.password" type="password" required placeholder="Password" />
          </b-form-group>
          <b-button type="submit" variant="success">Register</b-button>
        </b-form>
      </div>
    </div>
    <div class="col-2" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      await this.$auth.loginWith('local', { data: this.form })
      this.$router.push({ path: '/' })
    },
    async register () {
      await this.$axios.$post('/auth/register', {
        username: this.form.username,
        password: this.form.password
      })
      await this.login()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required,rules.emailRules]"
                    label="E-mail"
                    prepend-icon="email"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    prepend-icon="lock"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { getUser } from "@/services";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: {
      required
    }
  },
  props: {
    source: String
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      show1: false,
      rules: {
        required: value => !!value || "Field Required.",
        emailRules: v => /.+@.+/.test(v) || "E-mail must be valid"
      }
    };
  },
  methods: {
    async getUser() {
      try {
        let res = await getUser(this.email, this.password);
        if (res.status >= 200 && res.status < 300) {
          console.log("sukses");
          this.$session.start();
          this.$session.set("user", res.data.user);
          console.log(res.data);
          this.$router.push("/home");
        }
      } catch (err) {
        console.log("login gagal");
        console.log(err);
      }
    },
    validate() {
      // this.$refs.form.validate();
      console.log("validate clicked");
      this.getUser();
    }
  }
};
</script>
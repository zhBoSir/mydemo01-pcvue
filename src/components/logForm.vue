<template>
    <div class="login-form">
        <div class="g-form">
            <div class="g-form-line">
                <span class="g-form-label">用户名：</span>
                <div class="g-form-input">
                    <input type="text" v-model="usernameModel" placeholder="请输入用户名">
                </div>
                <span class="g-form-error">{{ userErrors.errorText }}</span>
            </div>
            <div class="g-form-line">
                <span class="g-form-label">密码：</span>
                <div class="g-form-input">
                    <input type="password" v-model="passwordModel" placeholder="请输入密码">
                </div>
                <span class="g-form-error">{{ passwordErrors.errorText }}</span>
            </div>
            <div class="g-form-line">
                <div class="g-form-btn">
                    <a class="button" @click="onLogin">{{ btnVal }}</a>
                </div>
            </div>
            <p></p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            btnVal: {
                type: String,
                default: '登录'
            }
        },
        data () {
            return {
                usernameModel: '',
                passwordModel: '',
                errorText: ''
            }
        },
        computed: {
            userErrors () {
                let errorText, status
                if (this.usernameModel === '' || this.passwordModel == undefined) {
                    status = false
                    errorText = '用户名不能为空'
                } else {
                    status = true
                    errorText = ''
                }
                // if (!this.usernameModel) {
                //     errorText = ''
                //     this.usernameFlag = true
                // }
                return {
                    status,
                    errorText
                }
            },
            passwordErrors () {
                let errorText, status
                if(this.passwordModel === '' || this.passwordModel == undefined) {
                    status = false
                    errorText = '密码不能为空'
                } else {
                    status = true
                    errorText = ''
                }
                // if (!this.passwordModel) {
                //     errorText = ''
                //     this.passwordFlag = true
                // }
                return {
                    status,
                    errorText
                }
            }
        },
        methods: {
            onLogin () {
                if (!this.userErrors.status || !this.passwordErrors.status) {
                    this.errorText = '请输入正确的用户名或者密码'
                } else {
                    this.errorText = ''
                    this.$emit('has-log', {
                        username: this.usernameModel,
                        password: this.passwordModel
                    })
                }
            }
        }
    }
</script>

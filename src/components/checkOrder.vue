<template>
    <div>
        <this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus2">
            请检查你的支付状态
            <div class="button" @click="checkStatus">支付成功</div>
            <div class="button" @click="checkStatus2">支付失败</div>
        </this-dialog>

        <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
            <h2 class="tips"><span>{{ seconds }}&nbsp;&nbsp;</span>秒后将跳转至订单列表页面...</h2>
            购买成功
        </this-dialog>
    </div>
</template>

<script>
    import Dialog from './base/dialog'
    export default {
        data () {
            return {
                isShowSuccessDialog: false,
                seconds: 5
            }
        },
        components: {
            thisDialog: Dialog
        },
        props: {
            isShowCheckDialog: {
                type: Boolean,
                default: false
            },
            orderId: {
                type: [String, Number]
            }
        },
        methods: {
           checkStatus () {
                this.isShowSuccessDialog = true
                let mythis = this
                let timer = setInterval(function(){
                    // 一个函数有定时器函数，记得把this在外面重新定义下
                    if(mythis.seconds <= 1) {    
                        mythis.isShowSuccessDialog = false
                        mythis.$router.push({path: '/orderList'}) 
                        clearInterval(timer)   
                    } else {
                        mythis.seconds --
                    }                    
                }, 1000)
        
                this.$emit('on-close-check-dialog')
           },
           checkStatus2 () {
                this.$emit('on-close-check-dialog')
           },
           toOrderList () {
               this.isShowSuccessDialog = false
               this.$router.push({path: '/orderList'})
           }
        }
    }
</script>

<style scoped>
.tips {
    font-size: 20px;
}
.tips span {
    color: gold;
    font-size: 36px;
}
</style>

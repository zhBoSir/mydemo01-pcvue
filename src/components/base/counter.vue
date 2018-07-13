<template>
    <div class="counter-component">
        <div class="counter-btn" @click="minus">-</div>
        <div class="counter-show">
            <!-- @keyup="fixNumber"的作用是让文本框只能输入数字 -->
            <input type="text" v-model="number" @keyup="fixNumber">
        </div>
        <div class="counter-btn" @click="add">+</div>
    </div>
</template>

<script>
    export default {
        props: {
            max: {
                type: Number,
                default: 1000
            },
            min: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                number: this.min
            }
        },
        watch: {
            // 监视number变量的变化，有变化了就执行里面的方法
            number () {
                this.$emit('on-change', this.number)
            }
        },
        methods: {
            // fixNumber函数的作用是让文本框只能输入数字
            fixNumber () {
                let fix
                if (typeof this.number === 'string') {
                    // 这行代码的作用是删除所有非数字的元素，得到一个数字字符串，然后转成数字
                    fix = Number(this.number.replace(/\D/g, ''))                    
                } else {
                    fix = this.number
                }
                if (fix > this.max || fix < this.min) {
                    fix = this.min
                }
                this.number = fix
            },
            minus () {
                if(this.number <= this.min) {
                    return
                }
                this.number --
            },
            add () {
                if(this.number >= this.max) {
                    return
                }
                this.number ++
            }
        }
    }
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>

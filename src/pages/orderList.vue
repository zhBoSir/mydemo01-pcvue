<template>
    <div class="order-wrap">
        <h3>您的产品</h3>
        <div class="order-list-choose">
            <div class="order-list-option">
                选择产品：
                <v-selection :selections="products" @on-change="productChange"></v-selection>
            </div>

            <div class="order-list-option">
                开始日期：
                <v-date-picker @on-change="getStartDate"></v-date-picker>
            </div>

            <div class="order-list-option">
                结束日期：
                <v-date-picker @on-change="getEndDate"></v-date-picker>
            </div>

            <div class="order-list-option">
                关键词：
                <input type="text" class="order-query" v-model.lazy="query">
            </div>
        </div>
        <div class="order-list-table">
            <table>
                <tr>
                    <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active: head.active}">{{head.label}}</th>
                </tr>
                <tr v-for="item in tableData">
                    <td v-for="head in tableHeads">{{ item[head.key] }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import vSelection from '../components/base/selection'
    import vDatePicker from '../components/base/datepicker'
    import _ from 'lodash'
    export default {
        data () {
            return {
                query: '',
                productId: 0,
                startDate: '',
                endDate: '',
                products: [
                    {
                        label: '数据统计',
                        value: 0
                    },
                    {
                        label: '数据预测',
                        value: 1
                    },
                    {
                        label: '流量分析',
                        value: 2
                    },
                    {
                        label: '广告发布',
                        value: 3
                    }
                ],
                tableHeads: [
                    {
                        label: '订单号',
                        key: 'orderId'
                    },
                    {
                        label: '购买产品',
                        key: 'product'
                    },
                    {
                        label: '版本类型',
                        key: 'version'
                    },
                    {
                        label: '有效时间',
                        key: 'period'
                    },
                    {
                        label: '购买日期',
                        key: 'date'
                    },
                    {
                        label: '数量',
                        key: 'buyNum'
                    },
                    {
                        label: '总价',
                        key: 'amount'
                    }
                ],
                tableData: [],
                orderlist: [
                    {
                        "orderId": "ddj123",
                        "product": "数据统计",
                        "version": "高级版",
                        "period": "1年",
                        "buyNum": 2,
                        "date": "2016-10-10",
                        "amount": "500元"
                    },
                    {
                        "orderId": "ddj125",
                        "product": "数据预测",
                        "version": "高级版",
                        "period": "6年",
                        "buyNum": 1,
                        "date": "2016-10-10",
                        "amount": "900元"
                    },
                    {
                        "orderId": "yuj583",
                        "product": "流量分析",
                        "version": "户外版",
                        "period": "3个月",
                        "buyNum": 1,
                        "date": "2016-5-2",
                        "amount": "2200元"
                    },
                    {
                        "orderId": "pmd201",
                        "product": "广告发布",
                        "version": "商铺版",
                        "period": "3年",
                        "buyNum": 12,
                        "date": "2016-8-3",
                        "amount": "7890元"
                    }
                ],
                currentOrder: 'asc'
            }
        },
        components: {
            vSelection,
            vDatePicker
        },
        methods: {
            getList () {
                let reqParams = {
                    query: this.query,
                    productId: this.productId,
                    startDate: this.startDate,
                    endDate: this.endDate
                }
                // 带上参数发送axios请求
                // 这里把数据写死
                this.tableData = this.orderlist
            },
            productChange (obj) {
                // vuex的用法
                // 改变页面参数重新获取展示列表是同步，所以直接发到mutations
                //  this.$store.commint('updateParams', {
                //     key: 'productId',
                //     val: obj.value
                // })
                // this.$store.dispatch('fetchOrderList')

                this.productId = obj.value
                this.tableData = [this.orderlist[obj.value]]
                // 带新参数重新拿到产品列表
                // this.getList()
            },
            getStartDate (date) {
                this.startDate = date
                // 带新参数重新拿到产品列表
                // this.getList()
            },
            getEndDate (date) {
                this.startDate = date
                // 带新参数重新拿到产品列表
                // this.getList()
            },
            changeOrderType (headItem) {
                // Array的map方法，经过函数处理后形成一个新数组
                this.tableHeads.map((item) => {
                    item.active = false
                    return item
                })
                headItem.active = true
                if (this.currentOrder === 'asc') {
                    this.currentOrder = 'desc'
                }
                else if (this.currentOrder === 'desc') {
                    this.currentOrder = 'asc'
                }
                this.tableData=_.orderBy(this.tableData, headItem.key, this.currentOrder)
            }          
        },
        mounted () {
            this.getList()
            // vuex的做法
            // this.$store.dispatch('fetchOrderList')
        },
        watch: {
            query () {
                // 当关键词发生变化后就重新带参数拿产品列表
                // 带新参数重新拿到产品列表
                // this.getList()
            }
        },
        // vuex的做法
        // computed: {
        //     tableData () {
        //         return this.$store.getters.getOrderList
        //     }
        // }
    }
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
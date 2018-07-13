<template>
    <div class="chooser-component">
        <ul class="chooser-list">
            <li v-for="(item, index) in selections" :class="{active: checkActive(index)}" :title="item.label" @click="toggleSelection(index)">
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: {
            selections: {
                type: Array,
                default: [{
                    label: 'test',
                    value: 0
                }]
            }
        },
        methods: {
            checkActive (index) {
                // 判断nowIndex数组里面是否包含每个标签的index,如果nowIndex数组里面存在index就返回true,显示active类
                return this.nowIndexes.indexOf(index) !== -1
            },
            toggleSelection(index) {
                if(this.nowIndexes.indexOf(index) === -1) {
                    this.nowIndexes.push(index)
                } else {
                    // let ind = this.nowIndex.indexOf(index) 
                    // this.nowIndex.splice(ind,1)
                    // 上面的方法是从数组中删除一个元素，具体方法是先拿到这个元素的索引，然后用splice方法删除

                    // 使用lodash方法
                    this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
                        return idx !== index
                    })                    
                }
                // 使用lodash的_.map()，返回新的映射后数组
                let nowObjArray = _.map(this.nowIndexes, (idx) => {
                    return this.selections[idx]
                })
                this.$emit('on-change', nowObjArray)
            }
        },
        data () {
            return {
                nowIndexes: [0]
            }
        }
    }
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>


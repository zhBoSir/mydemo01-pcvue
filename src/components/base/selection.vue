<template>
    <div class="selection-component">
        <div class="selection-show" @click="toggleDrop">
            <span v-if="nowIndex == -1">--请选择--</span>
            <span v-else>{{ selections[nowIndex].label }}</span>
            <div class="arrow"></div>
        </div>
        <div class="selection-list" v-if="isDrop">
            <ul>
                <li v-for="(item,index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '@/utils/eventBus'
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
        data() {
            return {
                nowIndex: -1,
                isDrop: false
            }
        },
        methods: {
            toggleDrop(event) {
                // 阻止冒泡事件的发生，因为eventBus要实现下拉框点击页面其他部位的时候收起来，所以注册了整个页面事件，这里点击下拉框，下拉框也属于页面的一部分，所以要阻止冒泡事件
                event.stopPropagation()
                // 这块再调用eventBus是为了防止两个selection同时出现的问题，触发这个事件可以实现点击一个selection的话，另一个selection下来的框可以收起来
                eventBus.$emit('reset-component')
                this.isDrop = !this.isDrop
            },
            chooseSelection(index) {
                this.nowIndex = index
                // 子组件把改变后选中的对象传递给父组件 
                this.$emit('on-change', this.selections[this.nowIndex])               
            }
        },
        mounted() {
            eventBus.$on('reset-component', () => {
                this.isDrop = false
            })
        }
    }
</script>

<style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.selection-list li:hover {
  background: #e3e3e3;
}
</style>


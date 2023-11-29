<script setup lang="ts">
    import {reactive,inject} from 'vue'
    import {resumeSkill} from '@/api/my'
    import {myStore} from '@/store/my'
    import {showToast} from 'vant'
    const {closeChange} = inject('popup') as any
    const state:any = reactive({
        value: '',
        show: false,
        skillList: [],
        sysSkill: []

    })
    const store:any = myStore()
    store.getResumeDict()
    const setInfo = () => {
        if(store.resumeInfo.sys_skill_ids){
            let arr = []
            // 生成新数组
            let skill = store.resumeInfo.sys_skill_ids.split(',')
            for(let i = 0;i<store.sysSkillList.length;i++){
                let flag = false
                for(let j=0;j<skill.length;j++){
                    if(skill[j] === store.sysSkillList[i].title){
                        flag = true
                        break
                    }
                }
                arr.push({
                    title: store.sysSkillList[i].title,
                    active: flag
                })
            }
            state.sysSkill = arr
        }
        if(store.resumeInfo.skill_ids){
            let arr = []
            let skill = store.resumeInfo.skill_ids.split(',')
            for(let i = 0;i<skill.length;i++){
                arr.push({
                    title: skill[i],
                    active: true
                })
            } 
        }
    }
    if(store.sysSkillList.length===0){
        (async function() {
            await store.getLabelsSkill()
            setInfo()
            console.log(1)
            console.log(state.sysSkill)
        })()
    }else{
        setInfo()
    }
    const skillChange = () => {
        state.skillList.push({
            title: state.value,
            active: false
        })
        state.value = ''
        state.show = false
    }
    // 设置自定义的
    const clearSkill = (index:Number) => {
        state.skillList.splice(index,1)
    }
    // 设置系统的
    const setSkill = (index:number) => {
        state.skillList[index].active = !state.skillList[index].active
    }
    const setSysSkill = (index:number) => {
        state.sysSkill[index].active = !state.sysSkill[index].active
    }
    const submit = async() => {
        let arr = []
        for(let i = 0;i<state.skillList.length;i++){
            if(state.skillList[i].active){
                arr.push(state.skillList[i].title)
            }
        }
        let sysArr = []
        for(let i = 0;i<state.sysSkill.length;i++){
            if(state.sysSkill[i].active){
                sysArr.push(state.sysSkill[i].title)
            }
        }
        const res = await resumeSkill({
            "skill_ids": String(arr), 
            "sys_skill_ids": String(sysArr) 
        })
        if(res){
            showToast('保存成功')
            closeChange()
        }else{
            showToast('保存失败')
        }
    }
</script>
<template>
    <van-nav-bar title="技能关键词" left-arrow @click-left="closeChange"/>
    <dl class="skill-list">
        <!-- 因为store中的数据不能直接修改，所以state中引用sysSkill -->
        <dt @click="setSysSkill(index)" v-for="(item,index) in state.sysSkill" :key="index" :class="item.active?'active':''">{{item.title}}</dt>
        <dt @click="setSkill(index)" v-for="(item,index) in state.skillList" :key="index" :class="item.active?'active':''">
            {{item.title}}
            <van-icon @click.stop="clearSkill(index)" name="close" />
        </dt>
        <dt @click="state.show = true">自定义+</dt>
    </dl>
    <van-dialog v-model:show="state.show" title="自定义标签" show-cancel-button
    @cancel="state.show=false" @confirm="skillChange">
        <van-field class="skill-field" v-model="state.value" placeholder="请输入标签" maxlength="10"/>
    </van-dialog>
    <button class="wy-submit" @click="submit">保存</button>
</template>
<style scoped>
    .skill-field{
    margin: 0 1rem;
  }
  .skill-list{
    padding: 1.31rem 1.09rem;
  }
  .skill-list dt{
    min-width: 4.5rem;
    height: 1.17rem;
    line-height: 1.17rem;
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    border-radius: 0.27rem;
    font-size: 0.64rem;
    font-weight: 400;
    color: #333333;
    text-align: center;
    display: inline-block;
    margin: 0 0.64rem 0.8rem 0;
  }
  .skill-list dt.active{
    border: 1px solid #FF8E00;
    color: #FF8E00;
  }
  .skill-list dt i{
    margin-left: 0.2rem;
  }
</style>
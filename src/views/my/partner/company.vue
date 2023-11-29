<script setup lang="ts">
    import {reactive,ref} from 'vue'
    import {addEnterprise} from '@/api/my'
    import { taskStore } from '@/store/task'
    import { showToast } from 'vant'
    import { areaList } from '@vant/area-data'
    const leftBack = ()=> history.back()
    const tsStore = taskStore()
    if(!tsStore.areaList.length) tsStore.getCityList()
    const state = reactive({
        city: '',
        area: '',
        management: '',
        team_nums: '',
        project_name: '',
        enterprise_name: '',
        name: '',
        phone: '',
        age: '',
        introduce: '',
        showCity: false
    })
    const cityConfirm = (value:any) => {
        state.city = value.selectedOptions[1].text
        state.area = value.selectedOptions[2].text
        state.showCity = false
    }
    const submit = async () => {
        if(!state.city){
            showToast('请选择城市')
            return
        }
        if(!state.management){
            showToast('请选择公司经营时间')
            return
        }
        if(!state.team_nums){
            showToast('请选择团队人数')
            return
        }
        if(!state.project_name){
            showToast('请选择公司经营项目')
            return
        }
        if(!state.enterprise_name){
            showToast('请输入企业名称')
            return
        }
        const res = await addEnterprise({
            "city": state.city,
            "management": state.management,
            "team_nums": state.team_nums,
            "project_name": state.project_name,
            "enterprise_name": state.enterprise_name,
            "name": state.name,
            "phone": state.phone,
            "age": state.age,
            "introduce": state.introduce
        })
        if(res){
            showToast('您的申请已收到，我们会尽快为您审核')
            state.city = ''
            state.management = ''
            state.team_nums = ''
            state.project_name = ''
            state.enterprise_name = ''
            state.name = ''
            state.phone = ''
            state.age = ''
            state.introduce = ''
        }
    }
    // van-area volar value报错
    const value = ref('110000')
</script>
<template>
    <div class="company-top">
        <van-icon name="arrow-left" size="1.3rem" @click="leftBack"/>
        <h3>申请企业入驻</h3>
        <h4>全国中小型企业免费入驻</h4>
    </div>
    <div class="company-page">
        <h5>我们的优势</h5>
        <p class="company-adv">全国中小型企业都可申请入驻我们平台,平台将给予技术扶持、企业经营指导、企业入驻将获取收益的10%</p>
        <h5>服务流程</h5>
        <div class="company-service">
            <img src="@/assets/img/my/partner/company-service-process.png" />
        </div>
        <h5>申请企业入驻</h5>
        <div class="company-settled">
            <van-form @submit="submit">
                <van-field v-model="state.city" label="您所在的城市:" 
                    placeholder="请选择城市"
                    readonly 
                    is-link 
                    @click="state.showCity = true" />
                <van-action-sheet v-model:show="state.showCity">
                    <van-area
                        v-model="value"
                        :area-list="areaList"
                        @confirm="cityConfirm"
                        @cancel="state.showCity = false"
                    />
                </van-action-sheet>
                <div class="wy-radio">
                    <label>您的公司经营了多久？</label>
                    <van-radio-group v-model="state.management" direction="horizontal">
                        <van-radio name="1年">1年</van-radio>
                        <van-radio name="1-3年">1-3年</van-radio>
                        <van-radio name="3年以上">3年以上</van-radio>
                    </van-radio-group>
                </div>
                <div class="wy-radio">
                    <label>您的团队有多少人？</label>
                    <van-radio-group v-model="state.team_nums" direction="horizontal">
                        <van-radio name="5-10人">5-10人</van-radio>
                        <van-radio name="15-20人">15-20人</van-radio>
                        <van-radio name="20人以上">20人以上</van-radio>
                    </van-radio-group>
                </div>
                <div class="wy-radio">
                    <label>公司经营项目？</label>
                    <van-radio-group v-model="state.project_name" direction="horizontal">
                        <van-radio name="教育">教育</van-radio>
                        <van-radio name="it">it</van-radio>
                        <van-radio name="其他">其他</van-radio>
                    </van-radio-group>
                </div>
                <p class="company-p">请标准编写您的联系方式</p>
                <van-field v-model="state.enterprise_name" label="企业名称:" placeholder="请输入企业名称" />
                <van-field v-model="state.name" label="您的姓名:" placeholder="请输入您的姓名" />
                <van-field v-model="state.phone" label="您的电话:" placeholder="请输入您的电话" />
                <van-field v-model="state.age" label="您的年龄:" placeholder="请输入您的年龄" />
                <van-field v-model="state.introduce" class="field-last" type="textarea" rows="8" label="企业介绍:" placeholder="请输入企业介绍" />
                <p class="company-tip">注：必须填写真实信息，发现填写造假，一律取消应 聘资格。如果您的资料符合要求，我们会尽快与您取 得联系，谢谢！</p>
                <button native-type="submit">提交申请</button>
            </van-form>
        </div>
    </div>
</template>
<style scoped>
:deep() .van-cell:first-child .van-field__label{
    width: 5rem;
}
:deep() .van-cell .van-field__label{
    width: 3.5rem;
}
.field-last{
    display: block;
}
.field-last :deep() .van-field__label{
    margin-bottom: 1rem;
}
.company-top{
    background: url('@/assets/img/my/partner/company-bg-top.png') no-repeat;
    height: 20rem;
    width: 100%;
    background-size: 100%;
}
.company-top h3{
    font-size: 2.45rem;
    line-height: 2.45rem;
    font-weight: 800;
    color: #FFFFFF;
    text-align: center;
    padding:3.68rem 0 0.96rem;
}
.company-top h4{
    font-size: 1.28rem;
    line-height: 1.28rem;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
}
h5{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-family: Lantinghei SC;
    font-weight: 600;
    color: #FD4919;
    background: #FFE28A;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.2rem;
    position: relative;
}
h5::after{
    position: absolute;
    width: 1.26rem;
    height: 0.13rem;
    background: linear-gradient(180deg, #FFE28A, #FA7911);
    content: '';
    left: 0.1rem;
    top: 1.2rem;
}
.company-page{
    background: #F03C17;
    padding:0.8rem;
}
.company-adv{
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0rem 0rem rgba(247,93,16,0.17);
    border-radius: 0.52rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #F03C17;
    line-height: 1.28rem;
    padding:0.8rem;
    margin: 0 0 1.23rem;
}
.company-service{
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0rem 0rem rgba(247,93,16,0.17);
    border-radius: 0.52rem;
    padding: 1.3rem 0.5rem;
    margin-bottom: 1.8rem;
}
.company-service img{
    width: 100%;
}
.company-settled{
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0rem 0rem rgba(247,93,16,0.17);
    border-radius: 0.52rem;
    padding: 0.8rem;
}
.wy-radio{
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    position: relative;
    color: var(--van-cell-text-color);
    font-size: var(--van-cell-font-size);
}
.company-p{
    color: var(--van-cell-text-color);
    font-size: var(--van-cell-font-size);
    padding: 1.2rem var(--van-cell-horizontal-padding) 0.8rem;
}
.wy-radio label{
    margin-bottom: 0.8rem;
    display: block;
}
.wy-radio:after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: var(--van-padding-md);
    bottom: 0;
    left: var(--van-padding-md);
    border-bottom: 1px solid var(--van-cell-border-color);
    transform: scaleY(.5);
}
.company-tip{
    font-size: 0.64rem;
    font-weight: 100;
    color: #999999;
    line-height: 0.96rem;
    padding: 1.2rem var(--van-cell-horizontal-padding) 0.8rem;
}
button{
    width: 13.8rem;
    height: 2.1rem;
    background: #F03C17;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 2.1rem;
    text-align: center;
    border: 0;
    margin: 0.5rem auto;
    display: block;
}
</style>
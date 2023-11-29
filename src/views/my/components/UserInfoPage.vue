<script setup lang="ts">
import { reactive, inject } from 'vue'
import { myStore } from '@/store/my'
import { taskStore } from '@/store/task'
import { common } from '@/utils/common'
import { showToast } from 'vant';
import { uploadImage, userModify } from '@/api/my'

const { closeChange } = inject('popup') as any
const state:any = reactive({
    loading: false,
    showSex: false,
    showBirthday: false,
    showWorkTime: false,
    showCity: false,
    name: '',
    sex: '',
    birthday: '',
    workTime: '',
    city: '',
    area: '',
    fileList: [],
    minDate: new Date(1970, 0, 1),
    maxDate: new Date()
})
const afterRead = async (file: any) => {
    file.status = 'uploading'
    file.message = '上传中...'
    let param = new FormData()
    param.append('user', 'test')
    param.append('file', file.file)
    const res: any = await uploadImage(param)
    file.url = res.imageUrl
    file.status = 'done'
    file.message = '上传成功'
    state.fileList = [file]
}

const store:any = myStore()
const tstore:any = taskStore()
if (!tstore.areaList.length) tstore.getCityList()
if (!store.userInfo.user_name) store.getUserInfo()
const setInfo = () => {
    state.name = store.userInfo.user_name
    state.sex = common.sex(store.userInfo.sex)
    state.birthday = store.userInfo.birthday
    state.workTime = store.userInfo.work_time
    state.city = store.userInfo.city
    state.area = store.userInfo.area
    if (store.userInfo.it_head) {

        state.fileList = [{
            url: store.userInfo.it_head
        }]
    }
}
if (!store.userInfo.user_name) {
    (async function () {
        await store.getUserInfo()
        setInfo()
    })()
} else {
    setInfo()
}

const sexList = [
    { name: '男' },
    { name: '女' }
]
const columnsType:any = ['year', 'month']
const birthdayConfirm = (value: any) => {
    state.birthday = value.selectedValues[0] + '-' + value.selectedValues[1] + value.selectedValues[2]
    state.showBirthday = false
}
const workTimeConfirm = (value: any) => {
    state.workTime = value.selectedValues[0] + '-' + value.selectedValues[1]
    state.showWorkTime = false
}
const cityConfirm = (value: any) => {
    console.log(value)
    state.city = value.selectedOptions[0].text
    state.area = value.selectedOptions[1].text
    state.showCity = false
}
const deleteFile:any = () => state.fileList = []
const sexSelect = (value: any) => state.sex = value.name
const setUserModify = async () => {
    if (state.fileList.length === 0) {
        showToast('请上传头像')
        return
    }
    if (!state.name) {
        showToast('请上传名字')
        return
    }
    if (!state.sex) {
        showToast('请上传性别')
        return
    }
    if (!state.birthday) {
        showToast('请上传出生日期')
        return
    }
    if (!state.workTime) {
        showToast('请上传参加工作时间')
        return
    }
    if (!state.workTime) {
        showToast('请上传参加工作时间')
        return
    }
    if (!state.city) {
        showToast('请上传所在城市')
        return
    }
    state.loading = true
    const res:any = await userModify({
        "user_name": state.name,
        "sex": state.sex === '男' ? 1 : state.sex === '女' ? 2 : '',
        "birthday": state.birthday,
        "work_time": state.workTime,
        "city": state.city,
        "area": state.area,
        "it_head": state.fileList[0].url,
        "type": 1
    })
    if (res) {
        store.getUserInfo()
    }
    showToast(res.msg)
}
</script>
<template>
    <van-nav-bar title="个人消息" left-arrow @click-left="closeChange" />
    <div class="user-page">
        <van-form @submit="setUserModify">
            <div class="user-pic">
                <van-uploader v-model="state.fileList" :after-read="afterRead" :before-delete="deleteFile" max-count="1"
                    accept=".jpg,.png" />
            </div>
            <div class="user-item">
                <h5>姓名</h5>
                <van-field v-model="state.name" placeholder="请输入您的姓名" />
            </div>
            <div class="user-item">
                <h5>性别</h5>
                <van-field @click="state.showSex = true" v-model="state.sex" placeholder="请选择您的性别" readonly is-link />
                <van-action-sheet v-model:show="state.showSex" :actions="sexList" cancel-text="取消" @select="sexSelect"
                    close-on-click-action />
            </div>
            <div class="user-item">
                <h5>出生年月</h5>
                <van-field @click="state.showBirthday = true" v-model="state.birthday" placeholder="请选择您的出生日期" readonly
                    is-link />
                <van-action-sheet v-model:show="state.showBirthday" close-on-click-action>
                    <van-date-picker type="" title="选择年月日" :min-date="state.minDate" :max-date="state.maxDate"
                        @confirm="birthdayConfirm" @cancel="state.showBirthday = false">
                    </van-date-picker>
                </van-action-sheet>
            </div>
            <div class="user-item">
                <h5>参加工作时间</h5>
                <van-field @click="state.showWorkTime = true" v-model="state.workTime" placeholder="请选择您的工作时间" readonly
                    is-link />
                <van-action-sheet v-model:show="state.showWorkTime" close-on-click-action>
                    <van-date-picker type="year-month" title="选择年月" :columns-type="columnsType" :min-date="state.minDate"
                        :max-date="state.maxDate" @confirm="workTimeConfirm" @cancel="state.showWorkTime = false">
                    </van-date-picker>
                </van-action-sheet>
            </div>
            <div class="user-item">
                <h5>所在城市</h5>
                <van-field @click="state.showCity = true" v-model="state.city" placeholder="请选择您的城市" readonly is-link />
                <van-action-sheet v-model:show="state.showCity" close-on-click-action>
                    <van-picker :columns="tstore.areaList" @confirm="cityConfirm" @cancel="state.showCity = false" />
                </van-action-sheet>
            </div>
            <button class="wy-confirm-btn" native-type="submit">完成</button>
        </van-form>


    </div>
</template>
<style scoped>
:deep(.van-iamge__mig)  {
    border-radius: 50%;
}

:deep(.van-uploader__upload)  {
    margin: 0;
}

.van-cell {
    padding: 0.8rem 0 0.6rem;
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 100;
    color: #999;
}

.user-page {
    margin: 0 0.6rem;
    overflow: auto;
}

.user-pic {
    text-align: center;
    padding: 0.67rem;
    margin-bottom: 1.47rem;
    border-bottom: 1px solid #f3f3f3;
}

.user-pic img {
    width: 3.7rem;
    height: 3.7rem;
    border-radius: 50%;
}

h5 {
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 300;
    color: #666;
}

.user-item {
    margin-bottom: 1.47rem;
    border-bottom: 1px solid #f3f3f3;
}

.wy-confirm-btn {
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #fea829, #fe8f27);
    border-radius: 0.27rem;
    width: calc(100vw - 1.2rem);
    border: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0 0.6rem 0.6rem;
    font-size: 0.8rem;
    color: #fff;
}</style>
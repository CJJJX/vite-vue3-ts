// 基准大小37.5用于将1rem等分为屏幕宽度的1/20。
const baseSize = 37.5
function setRem() {
    const scale = document.documentElement.clientWidth / 750
    document.documentElement.style.fontSize = baseSize * Math.min(scale,1)+'px'
}
setRem()
window.onresize = function (){
    setRem()
}
export default baseSize
const loading = document.querySelector('.loading')
const load_box = document.querySelector('.load-box')
const wrapper = document.querySelector('.wrapper')
const title_box = document.querySelector('.backBrowser > h1')
const root_box = document.querySelector('body')


const title_text_box = 'Hanwha Eagles'


// 백브라우저 뒷배경 디브깔기
for (let i = 0; i < 12; i++){
    const back_borwser_box = document.createElement('div')
    back_borwser_box.className = 'back_browser_boxs'
    back_borwser_box.style.left = i*160 + 80 + 'px'
    root_box.appendChild(back_borwser_box)
}


//로고 텍스트
for(let i = 0; i<title_text_box.length; i++){
    const spanbox = document.createElement('span')
    spanbox.innerText = title_text_box[i]
    spanbox.className = 'spanDefault'
    title_box.appendChild(spanbox)
}

//배경박스
for(let i=0; i<5; i++){
    for(let j=0; j<10; j++){
        const backbox = document.createElement('div')
        backbox.className = 'backbox'
        backbox.style.left = `${10*j}vw`
        backbox.style.top = `${20*i}vh`
        wrapper.appendChild(backbox)
    }
}
const backboxs = document.querySelectorAll('.backbox')
function backCloser(){
    let i = 1
    function backAnimation(y){    
        setTimeout(()=>{backboxs[y].classList.add('disappear')},20*i)
        i++ 
    
        if(i===51){i=1}}
    return backAnimation
}
const backClosers = backCloser()


async function backBoxDisappear(){
    load_box.style.opacity = '0'
    const lists = new Set();
      
    while (50 > lists.size) {
      lists.add(Math.floor(Math.random()*50));
    }

    for(let list of lists){                   
        backClosers(list)        
    }

    const spanboxs = document.querySelectorAll('.backBrowser > h1 > span')
    await wait(500)
    
    for(const s_box of spanboxs){
        s_box.style.opacity = 1
        await wait(100)
    }

}

window.addEventListener('load',()=>{
    setTimeout(backBoxDisappear,3000)
})


//중앙 박스
for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        divbox = document.createElement('div')
        divbox.className = 'divbox'
        divbox.style.left = `${2*j}vw`
        divbox.style.top = `${2*i}vw`
        loading.appendChild(divbox)}
}
divboxs = document.querySelectorAll('.divbox')

function closer(){
    let i = 1
    function boxAnimation(y){    
        setTimeout(()=>{divboxs[y].classList.add('boxAni')},300*i)
        i++ 
    
        if(i===10){i=1}}
    return boxAnimation
}
const closers = closer()

function boxDisappear(){    
    inventorys = []
    for(let i=0; i<9; i++){
        nums = Math.floor(Math.random()*9)
        if(inventorys.indexOf(nums)===-1){
            inventorys.push(nums)
        }
        else{i--}   
    }

    for(inventory of inventorys){   
                
        closers(inventory)        
    }
}

window.addEventListener('load', boxDisappear)


//백브라우저 텍스트 입력 효과
const back_Browser = document.querySelector('.backBrowser')
const text_box = document.querySelector('.text-box')
const textBoxs = document.querySelector('.text')
// const btn = document.querySelector('.button')
const texts = ['Created by Seo Bo Hyeong...']

let i = 0;

async function disappear_backbrw_boxs(){
    const back_bw_boxs = document.querySelectorAll('.back_browser_boxs')
    for(const b_bw_box of back_bw_boxs){
        b_bw_box.style.width = 0
        await wait(100)
    }
}

const displayText = async() => {

    for(let i=0; i<texts.length; i++){
    const text = texts[i].split('')
    while(text.length){
        await wait(100)
        textBoxs.innerHTML += text.shift()
    }} 
   

    await wait(600)
    const text3 = texts[0].split('')
    console.log(texts[0].length)
    while(text3.length > (texts[0].length - 3)){
        await wait(100)
        text3.pop()
        textBoxs.innerHTML = text3.join('')

    }
    await wait(800)
    text_box.style.opacity = 0  
    title_box.style.opacity = 0
    await wait(1000)
    text_box.remove()
    title_box.remove()
    wrapper.remove()

    await wait(200)   
    
    await disappear_backbrw_boxs()

    await wait(200)

    location.href = './public/main/main.html'
}

function wait(time){
    return new Promise(dum => setTimeout(dum,time))
}



setTimeout(displayText, 4500)




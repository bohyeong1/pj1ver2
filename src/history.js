import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import Flip from "gsap/Flip"
import ScrollSmoother from "gsap/ScrollSmoother"

///////////////////////////유틸 함수
function wait(time){
    return new Promise((res) => setTimeout(res,time))
}

gsap.registerPlugin(ScrollSmoother,ScrollTrigger,SplitText,Flip)

document.addEventListener('DOMContentLoaded', async()=>{

    const smoother = ScrollSmoother.create({
        wrapper:'#smooth-wrapper',
        content:'#smooth-content',
        smooth:1.5,
        effects:true
    })
    sec1_load1()
})




//gnb라인




//sector1
/////////텍스트 에니메이션
function sec1_load1(){
    const title_p = document.querySelectorAll('.his-sector1__container > p')
    const titles = gsap.utils.toArray(title_p)
    const titles_tl = gsap.timeline({
        onComplete: display_sec1
    })
    titles.forEach((el,index)=>{
        const splitTitles = new SplitText(el,{type:'chars'})
        splitTitles.chars.forEach((el)=>{
            gsap.set(el,{opacity:0})
        })
            titles_tl
            .to(splitTitles.chars,{
                opacity:1,
                y:-80,
                stagger:0.05
            },'<')
            .to(el,{
                opacity:1,
            },'<')
            .to(splitTitles.chars,{
            opacity:0,
            y:-160,
            rotateX:90,
            stagger:0.05
            },'<1')  
    })
}

////화면 display 에니메이션
const his_sec1 = document.querySelector('.his-sector1')
const animationTexts = his_sec1.querySelectorAll('p:not(.his-sector1__intro-text1):not(.his-sector1__text), .his-sector1__display-logo h1') ////에니메이션 주는 텍스트들
const sec1_intro = document.querySelector('.his-sector1__intro-text1')   /////////인트로텍스트


////////sec1 text ani 랜덤글자
function animateElement(){

    animationTexts.forEach((el)=>{
        let originalText = el.textContent
        let index = 0

        const shuffleText = setInterval(()=>{
            if(index < originalText.length){
                let suffledText=''
                for(let i = 0; i <= index; i++){
                    suffledText += 
                    i < index ? originalText[i] : Math.random().toString(36)[2]
                }
                el.textContent = suffledText + originalText.substring(index + 1)
                index ++
            }else{
                clearInterval(shuffleText)
                // console.log('확인')
                el.textContent = originalText
            }
        },100)
    })
}


////////sec1 text ani 글자타이핑
async function intro_animation(){
    const sec1_intro_texts = ['This is Eagles History Page! Please enjoy your trip back in time']

    const text = sec1_intro_texts[0].split('')
    while(text.length){
        await wait(50)
        sec1_intro.innerHTML += text.shift()
    }
}

////////sec1 img ani
function img_animation(){
    const filters = document.querySelectorAll('.his-sector1__mainImg-filter')
    const clipValue = [
        'polygon(10% 0, 0 0, 0 100%, 10% 100%)',
        'polygon(20% 0, 10% 0, 10% 100%, 20% 100%)',
        'polygon(30% 0, 20% 0, 20% 100%, 30% 100%)',
        'polygon(40% 0, 30% 0, 30% 100%, 40% 100%)',
        'polygon(50% 0, 40% 0, 40% 100%, 50% 100%)',
        'polygon(60% 0, 50% 0, 50% 100%, 60% 100%)',
        'polygon(70% 0, 60% 0, 60% 100%, 70% 100%)',
        'polygon(80% 0, 70% 0, 70% 100%, 80% 100%)',
        'polygon(90% 0, 80% 0, 80% 100%, 90% 100%)',
        'polygon(100% 0, 90% 0, 90% 100%, 100% 100%)'
    ]

    setTimeout(()=>{
        filters.forEach((filter, index)=>{
            gsap.to(filter,{
                clipPath:clipValue[index%clipValue.length],
                duration:1,
                delay: index * 0.1
            })
        })
    })
}
/// sec1 - display opacity 조정(시작부분)
async function sec1_opacity(){
    const his_sec1 = document.querySelector('.his-sector1__display-container')
    his_sec1.style.opacity = 1 
}

// sec1 - display 이벤트
async function display_sec1(){
    
    sec1_opacity()
    await wait(200)  //////다른방법없나?

    img_animation()
    intro_animation()
    animateElement()   
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////sector 2
const sector2_logo = document.querySelector('.his-sector2__logo h1')
const sec2_imgContainer = document.querySelectorAll('.his-sector2__img-container')


// sec2-logo text-ani
function sec2_logoAni(){
    const splitTexts = new SplitText(sector2_logo,{type:'chars'})
        gsap.from(splitTexts.chars,{
            opacity:0,
            y:'50%',
            stagger:0.05,
            scrollTrigger:{
                trigger:sector2_logo,
                start:'bottom center+=20%',
                end:'bottom bottom',

            }
        })
}
// sec2-line ani
function sec2_lineAni(){
    const row = document.querySelectorAll('.his-sector2__row')
    const column = document.querySelector('.his-sector2__column')
    gsap.to(row[0],{
        width:'100%',
        duration:2,
        scrollTrigger:{
            trigger:sector2_logo,
            start:'bottom center+=20%',
            end:'bottom bottom',
        }
    })
    gsap.to(column,{
        height:'100%',
        duration:2,
        scrollTrigger:{
            trigger:sector2_logo,
            start:'bottom center+=20%',
            end:'bottom bottom',
        }
    })
    gsap.to(row[1],{
        width:'100%',
        duration:2,
        scrollTrigger:{
            trigger:'.his-sector2',
            start:'bottom center+=40%',
            end:'bottom bottom',
            // markers:true
        }
    })
}

// sec2-img ani
function sec2_imgAni(){
    sec2_imgContainer.forEach((el)=>{
        gsap.from(el,{
            height:0,
            scrollTrigger:{
                trigger:el,
                start:'top center',
                end:'top top',
                scrub:true,
                // markers:true
            }
        })
    })
}

// sec2-scroll enter ani
function sec2_enterAni(){
    sec2_logoAni()  //logo ani
    sec2_lineAni() //line ani
    sec2_imgAni()   //img scroll ani
}

sec2_enterAni()







/////////////////////////////////////////////////////////////////////////////////////////////////// sec3-privew
//change background
function s3_priview_changeBack(){
    gsap.to('body',{
        scrollTrigger:{
            trigger:'.his-s3-preview',
            start:'top top+=25%',
            onEnter:()=>{gsap.to('body',{backgroundColor:'#EBD9C8', color:'black', duration:0.5,})},
            onLeaveBack:()=>{gsap.to('body',{backgroundColor:'black',color:'white', duration:0.5})},
            // markers:true
        }
    })

    ScrollTrigger.create({
        trigger:'.his-s3-preview',
        start:'top top+=5%',
        end:'+=45%',
        pin:'.his-s3-preview__logo'
    })
}

// break back
function s3_priview_breakBack(){
    ScrollTrigger.create({
        trigger:'.his-s3-preview',
        start:'top bottom',
        // markers:true,
        onLeaveBack:()=>{
            gsap.to('.his-s3-preview__fakelogo',{
                rotation:0,
                y:0
            })
        }
    })
    ScrollTrigger.create({
        trigger:'.his-s3-preview',
        start:'top top+=25%',
        // markers:true,
        onEnter:()=>{
            gsap.to('.his-s3-preview__fakelogo.part1',{
                rotation:-30,
                y:'130%',
                duration:1.5
            })
            gsap.to('.his-s3-preview__fakelogo.part2',{
                rotation:40,
                y:'130%',
                duration:1.5
            })
        }
    })

}


//s3-priview enter ani
function s3_pr_enterAni(){
    s3_priview_changeBack()
    s3_priview_breakBack()
}
s3_pr_enterAni()





///////////////////////////////////////////////////////////////////////////////섹션3


const video_boxs = document.querySelectorAll('.video-box')

async function videoHover(e){

    const innerTexts = e.target.querySelectorAll('.innerText')
    const innerVideo = e.target.querySelector('.innerVideo')
    if(innerVideo) {
        let src = innerVideo.getAttribute('src')
        innerVideo.src = `${src} + &autoplay=1&mute=1`

        for(let innerText of innerTexts){
            innerText.style.top = 0
            innerText.style.opacity=1
            await wait(70)
        }
    }
}

for(let video_box of video_boxs){
video_box.addEventListener('mouseenter', videoHover)
video_box.addEventListener('mouseleave', async(e)=>{
    const innerTexts = e.target.querySelectorAll('.innerText')
    const innerVideo = e.target.querySelector('.innerVideo')

    if(innerVideo) {
        let src = innerVideo.getAttribute('src')
        let textInventory = src.split('&')
        textInventory.splice(1,2)

        innerVideo.src = `${textInventory}`
        for(let innerText of innerTexts){
            innerText.style.top = '1vw'
            innerText.style.opacity=0
            await wait(70)
        }
    }    
})}




///////////////////////////////////////////////////////////////////////////////섹션4

// sec4 logo ani
function sec4_logoAni(){
    const sec4_logo = document.querySelector('.his-sector4__logo h1')
    const texts = new SplitText(sec4_logo,{type:'chars'})
    // console.log(texts.chars)

    gsap.from(texts.chars,{
        y:'50%',
        opacity:0,
        stagger:0.05,
        scrollTrigger:{
            trigger:sec4_logo,
            start:'top bottom-=30%',
            // markers:true
        }
    })
}

//sec4 click img ani

let s4_imgToggle = false    ///toggle state
const his_s4_title = document.querySelector('.his-sec4__des-title h1') 
const his_s4_age = document.querySelector('.his-sec4__des-age h2') 
const his_s4_enter = document.querySelector('.his-sec4__des-enter h2') 
const his_s4_des = document.querySelector('.his-sec4__des-contents p') 
const targetWrappers = document.querySelectorAll('.his-sector4__lg-player-wrapper')   ///target 
const container = document.querySelector('.his-sector4__lg-players')            ///container
const target_array = gsap.utils.toArray(targetWrappers)

function s4_imgClickAni(e){
    const classNames = ['his-s4-default','his-s4-active']

    if(!s4_imgToggle){s4_imgToggle = true} 
    const class_name = container.className.split(' ')[1]
    container.classList.remove(class_name)
    container.classList.add(s4_imgToggle ? classNames[1] : classNames[0])

    target_array.forEach((el) => {
        el.classList.toggle('his-s4-img-active', el !== e.currentTarget)
        el.style.filter = el === e.currentTarget ? 'grayscale(0)' : 'grayscale(100%)'
        })            

    his_s4_title.textContent = e.currentTarget.dataset.name
    his_s4_age.textContent = e.currentTarget.dataset.age
    his_s4_enter.textContent = e.currentTarget.dataset.enter
    his_s4_des.textContent = e.currentTarget.dataset.des
}


function sec4_cl_imgAni(){
    target_array.forEach((el)=>{
        el.addEventListener('click',s4_imgClickAni)
    })
}

//sec4 close btn
function sec4_closeBtn(){
    const closeBtn = document.querySelector('.his-sec4__close')
    const classNames = ['his-s4-default','his-s4-active']

    closeBtn.addEventListener('click', ()=>{
        const state = Flip.getState(target_array)

        s4_imgToggle = false
        container.classList.remove(classNames[1])
        container.classList.add(classNames[0])

        target_array.forEach((el) => {
            el.className.includes('his-s4-img-active') ? el.classList.remove('his-s4-img-active'):null
            el.style.filter = 'grayscale(100%)'
        }) 

        his_s4_title.textContent = null
        his_s4_age.textContent = null
        his_s4_enter.textContent = null
        his_s4_des.textContent = null

    })
}


// sec4 enter ani
function sec4_enterAni(){
    sec4_logoAni()
    sec4_cl_imgAni()
    sec4_closeBtn()
}

sec4_enterAni()


////////////////////////////////////////////////////////////////////////////////////////////////////////sec5
const his_s5_texts = document.querySelectorAll('.his-sector5-preview__logo span')
const his_s5_contents = document.querySelector('.his-sector5__contents')


// sec5 text reveal ani
function sec5_txReveal(){
    gsap.from(his_s5_texts,{
        y:'50%',
        stagger:0.05,
        opacity:0,
        scrollTrigger:{
            trigger:'.his-sector5',
            start:'top top+=30%',
            // markers:true,
            onComplete: () => {
                his_s5_texts.forEach(text => {
                    text.style.transition = '0.2s linear'
                })
            }
        }
    })
}

//s5 text scale ani
function sec5_txScale(){
    ScrollTrigger.create({
        trigger:'.his-sector5',
        start:'top top',
        end:'+=200%',
        pin:true,
        onUpdate:self=>{
            if(self.progress > 2/4 && self.progress <= 3/4){
                his_s5_texts[3].style.transform =  `scaleX(${1 + 28 * (self.progress-2/4)})`
                // console.log('확인')
            }
            if(self.progress>3/4){
                his_s5_contents.style.opacity = '1'
            }else{
                his_s5_contents.style.opacity = '0'
            }
        }
    })

    gsap.to('.his-sector5-preview__logo',{
        scale:15,
        transformOrigin:'center center',
        scrollTrigger:{
            trigger:'.his-sector5',
            start:'top top',
            end:'+=100%',
            scrub:true,
            // markers:true
        }
    })
}

//sec5 enter ani
function sec5_enterAni(){
    sec5_txReveal()
    sec5_txScale()
}

sec5_enterAni()




/////////////////////////////scrollsmoother 등록
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
document.addEventListener('DOMContentLoaded',function(){
    const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,  
        effects: true  
    })
})


//////////////////////////마우스 호버 이벤트
const cursorParent = document.querySelector('#mouse-cursor')
const cursorChild = document.querySelector('#inner-cursor')



let cursorX = 0, cursorY = 0
function mousemove(e){
    cursorParent.style.display = 'block'
    cursorX = e.pageX - cursorParent.offsetWidth/2
    cursorY = e.pageY - cursorParent.offsetHeight/2
    cursorParent.style.left = `${cursorX}px` 
    cursorParent.style.top = `${cursorY}px`
    e.target.style.cursor = 'none'
}
function mousedown(e){
    cursorChild.style.setProperty('--cursor-scale',0.8)
}
function mouseup(e){
    cursorChild.style.setProperty('--cursor-scale',1)
}






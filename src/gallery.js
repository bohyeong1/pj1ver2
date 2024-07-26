import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import Flip from "gsap/Flip"
import ScrollSmoother from "gsap/ScrollSmoother"

///////////////////////////유틸 함수 / gsap 등록 / 렌더 이벤트
function wait(time){
    return new Promise((res) => setTimeout(res,time))
}

gsap.registerPlugin(ScrollSmoother,ScrollTrigger,SplitText,Flip)

document.addEventListener('DOMContentLoaded', ()=>{

    const smoother = ScrollSmoother.create({
        wrapper:'#smooth-wrapper',
        content:'#smooth-content',
        smooth:1.5,
        effects:true
    })
    sec1_load1()


})

//gnb라인




/////////////////////////////////////////////////////////////////////////////////sector1
// s1-logo 돔
const title_p = document.querySelectorAll('.gallery-sector1__load-container > p') //text

//s1-contents 돔
const images_container = document.querySelector('.gallery-sector1__images')
const preview = document.querySelector('.gallery-sector1__preview')
const minimap = document.querySelector('.gallery-sector1__minimap')
const preview_items = document.querySelectorAll('.gallery-sector1__item-preview')
const image_items = document.querySelectorAll('.gallery-sector1__item')


/////////텍스트 에니메이션
function sec1_load1(){
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
    const titles = gsap.utils.toArray(title_p)
    const titles_tl = gsap.timeline({
        onComplete:()=>{
            document.querySelector('.gallery-sector1__load-wrapper').style.display='none'
            body.style.overflow = 'auto'
            sec1_img_load()
            }
    })
    titles.forEach((el)=>{
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


//////섹션 1 이미지 스크롤 이벤트 + 로드 이벤트
function sec1_img_load(){
    ScrollTrigger.create({
        trigger:'.gallery-sector1__contents-container',
        start:'top top',
        end:'bottom-=10% top',
        pin:minimap,
        // markers:true
    })

    const s1_tl = gsap.timeline({
        onComplete:sec1_img_scroll
    })
    s1_tl.to(images_container,{
        y:0,
        duration:0.5
    })
    s1_tl.to(images_container,{
        scale:1,
        duration:0.6
    })
    s1_tl.to(minimap,{
        opacity:1,
        duration:0.4
    },'-=0.4')
}

// s1 - img scroll ani
function sec1_img_scroll(){
    function getElementTop(element){
        let top = 0
        while(element){
            top += element.offsetTop
            element = element.offsetParent
        }
        return top
    }
    
    const images_start = getElementTop(images_container)
    const images_end = images_start + images_container.offsetHeight
    
    const preview_heihgt = preview.offsetHeight
    const previewMax_translate = preview_items[0].offsetHeight - preview_heihgt
    
    
    function handleScroll(){
        const scroll_position = window.scrollY
        const scroll_range = images_end - images_start - (image_items[0].offsetHeight + 50)
        const preview_scrollrange = Math.min(previewMax_translate, scroll_range)
    
    
        // console.log(image_items[0].offsetHeight)
        if(scroll_position >= images_start && scroll_position <= images_end - (image_items[0].offsetHeight + 50)){
            let scroll_fraction = (scroll_position - images_start) / scroll_range
            let preview_translateY = scroll_fraction * preview_scrollrange
            preview.style.transform = `translateX(-50%) translateY(${preview_translateY}px)`
    
        }else if(scroll_position < images_start){
            preview.style.transform = `translateX(-50%) translateY(0%)`
        }else{
            preview.style.transform = `translateX(-50%) translateY(${previewMax_translate}px)`
        }
    }
    
    window.addEventListener('scroll',handleScroll)
    
    const toggle_point = window.innerHeight * 2
    const wrapper = document.querySelector('.gallery-sector1__contents-container')
    
    function checkScroll(){
        if(window.scrollY >= toggle_point){
            wrapper.classList.add('light-theme')
        }else{
            wrapper.classList.remove('light-theme')
        }
    }
    
    
    window.addEventListener('scroll',checkScroll)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////sector2
const sec2_texts = document.querySelectorAll('.gallery-sector2__text-wrapper p')

//sector2 scroll ani
function sec2_scrollAni(){
    gsap.to('.gallery-sector2__move-img',{
        y:'-25%',
        scrollTrigger:{
            trigger:'.gallery-sector2__move-img',
            start:'top bottom',
            end:'bottom top',
            scrub:true,
            // markers:true
        }
    })
}

// sector2 text ani
function sec2_text(){
    const texts = gsap.utils.toArray(sec2_texts)
    const titles_tl = gsap.timeline({
        scrollTrigger:{
            trigger:'.gallery-sector2__move-img',
            start:'top bottom',
            end:'bottom top'
        }
    })
    texts.forEach((el)=>{
        const splitTitles = new SplitText(el,{type:'lines'})
            titles_tl
            .from(splitTitles.lines,{
                opacity:0,
                y:40,
                stagger:0.1
            })
        
    })
}


// sec2-scroll enter ani
function sec2_enterAni(){
    sec2_scrollAni()
    sec2_text()
}

sec2_enterAni()


//////////////////////////////////////////////////////////////////////////////////////////////////////////////sector3
const sec3_slide = document.querySelector('.gallery-sector3__img-container')
// sec3-scroll ani
function sec3_scrollAni(){
    gsap.to('.gallery-sector3__img-container',{
        scrollTrigger:{
            trigger:'.gallery-sector3__img-container',
            start:'top bottom',
            toggleActions:'play none none reverse',
            onEnter:()=>{
                sec3_slide.style.animationPlayState = 'running'
            },
            onLeaveBack:()=>{
                sec3_slide.style.animationPlayState = 'paused'
            }
        }
    })
}


// sec3-scroll enter ani
function sec3_enterAni(){
    sec3_scrollAni()

}

sec3_enterAni()



////////////////////////////////////////////////////////////////////////////////////////////////////////modal animation
const gallery_selections = document.querySelectorAll('.gallery-sector1__item-img')
const closeBtn = document.getElementById('gallery-modal__closeBtn')
const modal_img = document.querySelector('.gallery-modal__gallerys img')
const path = document.querySelector('path')

const modalTl = gsap.timeline({ paused: true })


function revealModal() {
    const start = 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
    const end = 'M 0 100 V 0 Q 50 0 100 0 V 100 z'

    modalTl.to('.gallery-modal', 0.1, {
        opacity: 1,
        ease: 'power2.inOut'
    })

    modalTl.to(path, 0.8, {
        attr: { d: start },
        ease: 'power1.in'
    }).to(path, 0.4, {
        attr: { d: end },
        ease: 'power3.out'
    })

    modalTl.from('.gallery-modal__block', 1, {
        clipPath: 'inset(0 100% 0 0)',
        ease: 'power4.easeOut',
        stagger: {
            amount: 0.25
        }
    })

    modalTl.from('.gallery-modal__gallerys img', 1, {
        scale: 3,
        ease: 'power4.easeOut',
        stagger: {
            amount: 0.25
        }
    }, '-=1.5')

    modalTl.from('#gallery-modal__closeBtn', 0.7, {
        opacity: 0,
        right: '-10%',
        ease: 'power4.easeIn'
    }, '-=1.5')
}

revealModal()


gallery_selections.forEach((el,index) => {
    el.addEventListener('click',()=>{
        // console.log('확인')
        console.log(index)
        if(index === 0 || index === 1 || index === 2){
            modal_img.style.filter='grayscale(1)'
        }else{
            modal_img.style.filter='none' 
        }
        modal_img.src = el.dataset.url
        modalTl.reversed(false)
        modalTl.play()
    }) 
})

closeBtn.addEventListener('click',()=>{
    modalTl.reversed(true)
})











// 스크롤초기화
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}


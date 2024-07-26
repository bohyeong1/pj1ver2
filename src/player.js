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

    // back_img_render()


})

//gnb라인




/////////////////////////////////////////////////////////////////////////////////sector1
const s1_back_imgs = document.querySelector('.player-sector1__back-imgs') // back img container
const title_p = document.querySelectorAll('.player-sector1__container > p') //text
/////////텍스트 에니메이션
function sec1_load1(){
    const titles = gsap.utils.toArray(title_p)
    const titles_tl = gsap.timeline({
        onComplete:back_img_render
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

//섹션1 back img - render 함수
function back_img_render(){
    gsap.to('.player-sector1__back-imgs > img',{
        clipPath : 'polygon(100% 0, 0 0,0 100%, 100% 100%)',
        duration:1,
        ease:'power4.inOut',
        stagger:'0.25' ,
        onComplete:()=>{
            const split_texts = new SplitText('.player-sector1__logo-text', {type:'chars'})
            split_texts.chars.forEach((el)=>{
                gsap.set(el,{opacity:0})
            })
            gsap.to(split_texts.chars,{
                y:'-100%',
                opacity:1,
                stagger:0.1,
                delay:0.5
            })
            gsap.to('.player-sector1__header > p',{
                y:'0',
                opacity:1,
                delay:0.5
            })
        }
    })    
}





////////////////////////////////////////////////////////////////////////section2

const sector2_logos = document.querySelectorAll('.player-sector2__logo h1')
const sector2_boxs = document.querySelectorAll('.player-sector2__boxs')

// sec2-logo text-ani
function sec2_logoAni(){
    sector2_logos.forEach((el)=>{
        const splitTexts = new SplitText(el,{type:'chars'})
        gsap.from(splitTexts.chars,{
            opacity:0,
            y:'50%',
            stagger:0.05,
            scrollTrigger:{
                trigger:el,
                start:'bottom center+=20%',
                end:'bottom bottom'
            }
        })
    })
}

// sec2-scroll-ani
function sec2_imgAni(){
    ScrollTrigger.create({
        trigger:'.player-sector2',
        pin:true,
        start:'top top',
        end:'+=75%'
    })
    const sec2_tl = gsap.timeline({
        scrollTrigger:{
            trigger:'.player-sector2',
            scrub:true,
            start:'top top',
            end:'+=75%',
        }
    })
    sec2_tl.to('.player-sector2__logo',{
        opacity:0
    },0)

    sec2_tl.from(sector2_boxs[0],{
        x:'5vw',
        y:'38vh',
        rotation:-7
    },0)
    sec2_tl.from(sector2_boxs[1],{
        y:'34vh',
        rotation:-1
    },0)
    sec2_tl.from(sector2_boxs[2],{
        x:'-5vw',
        y:'38vh',
        rotation:7
    },0)
}



// sec2-scroll enter ani
function sec2_enterAni(){
    sec2_logoAni()  //logo ani
    sec2_imgAni()   //scroll ani
}

sec2_enterAni()





////////////////////////////////////////////////////////////////////////section3
const sector3_logo = document.querySelector('.player-sector3__logo h1')
const sector3_titles = document.querySelectorAll('.player-sector3__title h3')
const sector3_move_slide = document.querySelectorAll('.p-s3-moveslide')
const sector3_contents_boxs = document.querySelectorAll('.player-sector3__contents-box')
const sector3_texts = document.querySelectorAll('.player-sector3__text')
const sector3_logs = document.querySelectorAll('.player-sector3__contents-logo')
const sector3_imgs = document.querySelectorAll('.player-sector3___img-wrapper img')

// sec3-logo ani
function sec3_logoAni(){
    const splitTexts = new SplitText(sector3_logo,{type:'chars'})
        gsap.from(splitTexts.chars,{
            opacity:0,
            y:'50%',
            stagger:0.05,
            scrollTrigger:{
                trigger:sector3_logo,
                start:'bottom center+=20%',
                end:'bottom bottom'
            }
        })

    sector3_titles.forEach((el)=>{
        const splitTitles = new SplitText(el,{type:'chars'})
        gsap.from(splitTitles.chars,{
            opacity:0,
            y:'50%',
            stagger:0.05,
            scrollTrigger:{
                trigger:el,
                start:'bottom center+=20%',
                end:'bottom bottom'
            }
        })
    })
}

// sec3-scroll ani
function sec3_scrollAni(){
    gsap.to('body',{
        backgroundColor:'#fff',
        duration:0.5,
        scrollTrigger:{
            trigger:'.player-sector3',
            start:'top center+=20%',
            toggleActions: 'play none none reverse'
        }
    })

    ScrollTrigger.create({
        trigger:'.player-sector3',
        pin:true,
        start:'top top',
        end:'+=220%'
    })
    const sec3_tl = gsap.timeline({
        scrollTrigger:{
            trigger:'.player-sector3',
            scrub:true,
            start:'top top',
            end:'+=220%',
            onUpdate:self=>{
                if(self.progress > 0.1 && self.progress < 0.2){
                    sector3_contents_boxs[0].style.opacity = `${1 - (self.progress - 0.1)*10}`
                    sector3_contents_boxs[0].style.scale = `${1 - (self.progress - 0.1)*3}`
                    sector3_imgs[0].style.opacity = `${1 - (self.progress - 0.1)*10}`
                    sector3_imgs[1].style.opacity = `${(self.progress - 0.1)*10}`
                }else if(self.progress > 0.43 && self.progress < 0.53){
                    sector3_texts[1].style.opacity = `${1 - (self.progress - 0.43)*10}`
                    sector3_texts[1].style.scale = `${1 - (self.progress - 0.43)*3}`
                    sector3_logs[0].style.opacity = `${1 - (self.progress - 0.43)*8}`
                    sector3_imgs[1].style.opacity = `${1 - (self.progress - 0.43)*10}`
                    sector3_imgs[2].style.opacity = `${(self.progress - 0.43)*10}`
                }else if(self.progress > 0.76 && self.progress < 0.86){
                    sector3_texts[2].style.opacity = `${1 - (self.progress - 0.76)*10}`
                    sector3_texts[2].style.scale = `${1 - (self.progress - 0.76)*3}`
                    sector3_logs[1].style.opacity = `${1 - (self.progress - 0.76)*8}`
                    sector3_imgs[2].style.opacity = `${1 - (self.progress - 0.76)*10}`
                    sector3_imgs[3].style.opacity = `${(self.progress - 0.76)*10}`
                }

            }
        }
    })

    // sector3_contents_boxs
    sector3_move_slide.forEach((el, index)=>{
        sec3_tl.from(el,{
            bottom:`${-8 -6*index}vh`,
            // top:'auto',
            y:0,
        })
    })

    // sector3_img_boxs
}

// sec3-scroll enter ani 
function sec3_enterAni(){
    sec3_logoAni()  //logo ani
    sec3_scrollAni()    //scroll ani
}

sec3_enterAni()




////////////////////////////////////////////////////////////////////////section4
const sec4_contents_boxs = document.querySelectorAll('.player-sector4__contents')
const sec4_move_boxs = document.querySelectorAll('.player-sector4__move-box1 div')

// sec4-scroll ani
function sec4_scrollAni(){
    gsap.from(sec4_contents_boxs[0],{
        y:'60%',
        rotation:-10,
        scrollTrigger:{
            trigger:'.player-sector3',
            start:'center top',
            end:'bottom top',
            scrub:true,
        }
    })

    gsap.from(sec4_move_boxs[0],{
        y:'-110%',
        scrollTrigger:{
            trigger:'.player-sector3',
            start:'center top',
            end:'bottom top',
            scrub:true
        }
    })

    gsap.from(sec4_move_boxs[1],{
        y:'-110%',
        x:'-20%',
        scrollTrigger:{
            trigger:'.player-sector3',
            start:'center top',
            end:'bottom top',
            scrub:true
        }
    })

    ScrollTrigger.create({
        trigger:'.player-sector4',
        start:'top top+=20%',
        onEnter:()=>{
            gsap.to('body',{backgroundColor:'black', duration:0.5,})
        },
        onLeaveBack:()=>{
            gsap.to('body',{backgroundColor:'white', duration:0.5,})
        }
    })

    ScrollTrigger.create({
        trigger:'.player-sector4',
        start:'top top',
        end:'+=300%',
        pin:'.player-sector4'
    })


    ScrollTrigger.create({
        trigger:'.player-sector4',
        start:'top top',
        end:'+=200%',
        scrub:true,
        onUpdate:self=>{
            if(self.progress > 0 && self.progress < 0.2){
                sec4_contents_boxs[1].style.opacity = `${self.progress/0.2}`
            }else if(self.progress > 0.33 && self.progress < 0.53){
                sec4_contents_boxs[2].style.opacity = `${(self.progress - 0.33)/0.2}`
            }else if(self.progress > 0.66 && self.progress < 0.86){
                sec4_contents_boxs[3].style.opacity = `${(self.progress - 0.66)/0.2}`
            }

            if(self.progress > 0 && self.progress < 0.25){
                sec4_contents_boxs[0].style.opacity = `${1 - self.progress/0.25}`
            }else if(self.progress > 0.33 && self.progress < 0.58){
                sec4_contents_boxs[1].style.opacity = `${(1 - (self.progress - 0.33)/0.25)}`
            }else if(self.progress > 0.66 && self.progress < 0.91){
                sec4_contents_boxs[2].style.opacity = `${(1 - (self.progress - 0.66)/0.25)}`
            }
        }
    })


    gsap.to('.player-sector4__container',{
        x:'-68%',
        scrollTrigger:{
            trigger:'.player-sector4',
            start:'top top',
            end:'+=300%',
            scrub:true
        }
    })
}



// sec4-scroll enter ani
function sec4_enterAni(){
    // sec3_logoAni()  //logo ani
    sec4_scrollAni()    //scroll ani
}

sec4_enterAni()

/////////////////////////////////////////////////////////////////////////////////////////////////sec5
const sector5_logos = document.querySelector('.player-sector5__logo h1')
const sector5_lines = document.querySelectorAll('.player-sector5__line')
const sector5_boxs = document.querySelectorAll('.player-sector5__part1-title, .player-sector5__part1-lists, .player-sector5__part2-lists')
// sec5-logo text-ani
function sec5_logoAni(){

    const splitTexts = new SplitText(sector5_logos,{type:'chars'})
    gsap.from(splitTexts.chars,{
        opacity:0,
        y:'50%',
        stagger:0.05,
        scrollTrigger:{
            trigger:sector5_logos,
            start:'bottom center+=20%',
            end:'bottom bottom'
        }
    })

    // sector5_lines.forEach((el)=>{
        // gsap.from(el,{
        //     scaleX:0,
        //     duration:1,
        //     scrollTrigger:{
        //         trigger:el,
        //         start:'bottom center+=35%',
        //         end:'bottom bottom'
        //     }
        // })
    // })

    sector5_boxs.forEach((el)=>{
        gsap.from(el,{
            y:'20%',
            opacity:0,
            duration:1,
            scrollTrigger:{
                trigger:el,
                start:'bottom center+=35%',
                end:'bottom bottom'
            }
        })
    })


}
// sec5-scroll enter ani
function sec5_enterAni(){
    sec5_logoAni()  //logo ani
}

sec5_enterAni()


////////////////////////////////////////////////////////////////////////////////////////////////////////modal animation
const playerSelections = document.querySelectorAll('.player-sector5__part2-lists, .player-sector5__part1-lists')
const closeBtn = document.getElementById('player-modal__closeBtn')
const modal_img = document.querySelector('.player-modal__player img')
const path = document.querySelector('path')

const modalTl = gsap.timeline({ paused: true })


function revealModal() {
    const start = 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
    const end = 'M 0 100 V 0 Q 50 0 100 0 V 100 z'

    modalTl.to('.player-modal', 0.1, {
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

    modalTl.from('.player-modal__block', 1, {
        clipPath: 'inset(0 100% 0 0)',
        ease: 'power4.easeOut',
        stagger: {
            amount: 0.25
        }
    })

    modalTl.from('.player-modal__player img', 1, {
        scale: 3,
        ease: 'power4.easeOut',
        stagger: {
            amount: 0.25
        }
    }, '-=1.5')

    modalTl.from('#player-modal__closeBtn', 0.7, {
        opacity: 0,
        right: '-10%',
        ease: 'power4.easeIn'
    }, '-=1.5')
}

revealModal()


playerSelections.forEach((el) => {
    el.addEventListener('click',()=>{
        modal_img.src = el.dataset.url
        modalTl.reversed(false)
        modalTl.play()
    }) 
})

closeBtn.addEventListener('click',()=>{
    modalTl.reversed(true)
})





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
const title_p = document.querySelectorAll('.cheer-sector1__load-container > p') //text
const body = document.querySelector('body')

/////////텍스트 에니메이션
function sec1_load1(){
    body.style.overflow = 'hidden'
    const titles = gsap.utils.toArray(title_p)
    const titles_tl = gsap.timeline({
        onComplete:()=>{
            document.querySelector('.cheer-sector1__load-wrapper').style.display='none'
            sec1_imgAni()
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


///////////////////////////////////////img 에니메이션

/////////////pixi로 만든 슬라이더 불러오기
import {init_pixi} from './pixi_slide_module.js'


function sec1_imgAni(){
    
    const sec1_main = document.querySelector('.cheer-sector1__content')

    const sec1_tl = gsap.timeline({
        delay:0,
        onComplete:()=>{
            sec1_main.style.opacity = 1
            init_pixi('cheer-sector1__content','cheer-sector1__canvas')
            body.style.overflow = 'auto'}})

    sec1_tl.to('.cheer-sector1__col',{
        top:0,
        duration:3,
        ease:'power4.inOut'
    })

    sec1_tl.to('.cheer-sector1__c-1 .cheer-sector1__item',{
        top:0,
        stagger:0.25,
        duration:3,
        ease:'power4.inOut'
    },'-=2')

    sec1_tl.to('.cheer-sector1__c-2 .cheer-sector1__item',{
        top:0,
        stagger:-0.25,
        duration:3,
        ease:'power4.inOut'
    },'-=4')

    sec1_tl.to('.cheer-sector1__c-3 .cheer-sector1__item',{
        top:0,
        stagger:0.25,
        duration:3,
        ease:'power4.inOut'
    },'-=4')

    sec1_tl.to('.cheer-sector1__c-4 .cheer-sector1__item',{
        top:0,
        stagger:-0.25,
        duration:3,
        ease:'power4.inOut'
    },'-=4')

    sec1_tl.to('.cheer-sector1__c-5 .cheer-sector1__item',{
        top:0,
        stagger:0.25,
        duration:3,
        ease:'power4.inOut'
    },'-=4')

    sec1_tl.to('.cheer-sector1__container',{
        scale:6,
        duration:4,
        ease:'power4.inOut'
    },'-=2')

    sec1_tl.to('.cheer-sector1__container',{
        opacity:0,
        duration:2,
        ease:'power4.inOut'
    },'-=2.5')

}


















/////////////////////////////////////////////////////////////////////////////////sector2
// sec2 - scroll ani
function sec2_scrollAni(){
    gsap.to('.cheer-sector1__gradient-wrapper',{
        y:'-95%',
        scrollTrigger:{
            trigger:'.cheer-sector1',
            start:'top top',
            end:'+=100%',
            scrub:true,
            pin:'.cheer-sector1'
        }
    })



    // 스크롤 트리거
    function sec2_img_scaleAni(){
        gsap.utils.toArray('.cheer-sector2__section').forEach((el, index)=>{
            const image = document.querySelector(`#cheer-sector2__preview-${index + 1} img`)
    
            const start_value = 'bottom bottom'
    
            gsap.to(image,{
                scrollTrigger:{
                    trigger:el,
                    start:start_value,
                    end:'+=100%',
                    scrub:1
                    // markers:true
                },
                scale:1.4,
                ease:'none'
            })
        })
    }

    sec2_img_scaleAni()
    
    // 클립 애니메이션
    function sec2_clipAni(
        section_part,
        prev_part,
        end_clip,
        start = 'top center',
        end = 'bottom top'
    ){
        let section = document.querySelector(section_part)
        let preview = document.querySelector(prev_part)
    
        ScrollTrigger.create({
            trigger:section,
            start:start,
            end:end,
            onEnter:()=>{
                gsap.to(preview,{
                    scrollTrigger:{
                        trigger:section,
                        start:start,
                        end:end,
                        scrub:0.125,
                    },
                    clipPath:end_clip,
                    ease:'none'
                })
            }
        })
    }
    
    sec2_clipAni(
        '#cheer-sector2__section-1',
        '#cheer-sector2__preview-1',
        'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    )
    
    const total_sections = 8
    
    for(let i = 2; i<=total_sections; i++){
        let current_section = `#cheer-sector2__section-${i}`
        let prev_section = `#cheer-sector2__preview-${i - 1}`
        let current_prev = `#cheer-sector2__preview-${i}`
    
        sec2_clipAni(
            current_section,
            prev_section,
            'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            'top bottom',
            'center center'
        )    

        sec2_clipAni(
            current_section,
            current_prev,
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'center center',
            'bottom top'
        )

        if(i === total_sections){
            sec2_clipAni(
                current_section,
                current_prev,
                'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                'bottom top-=10%',
                '+=100%'
            )
        }

    }


    // background color
    const s2_color = ['#eeeeea','#2a4655','#262c29','#bfccd8','#1e2126','#202045','#994b36','#000']
    const s2_section = Array.from(document.querySelectorAll('.cheer-sector2__headers section')) 
    const s2_texts = Array.from(document.querySelectorAll('.cheer-sector2__section h1')) 


    const s2_gap = s2_section[0].clientHeight + window.innerHeight*1.3  //간격



    s2_section.forEach((el,index)=>{
        ScrollTrigger.create({
            trigger:el,
            start:'top bottom',
            end:`+=${s2_gap}`,
            onEnter:()=>{
                gsap.to('body',{
                    backgroundColor:s2_color[index],
                    duration:0.8,
                })

                gsap.to('.cheer-sector1__default',{
                    backgroundColor:s2_color[index],
                    duration:0.8,
                })

            },
            onEnterBack:()=>{
                gsap.to('body',{
                    backgroundColor:s2_color[index],
                    duration:0.8,
                })

                gsap.to('.cheer-sector1__default',{
                    backgroundColor:s2_color[index],
                    duration:0.8,
                })

            },
            onLeaveBack:()=>{
                if(index===0){
                    gsap.to('body',{
                        backgroundColor:'black',
                        duration:0.2,
                    })
                    gsap.to('.cheer-sector1__default',{
                        backgroundColor:'black',
                        duration:0.2,
                    })
                }
            }
        })

        s2_texts[index].style.color = s2_color[index]

    })
}




// sec2-scroll enter ani
function sec2_enterAni(){
    sec2_scrollAni()
}

sec2_enterAni()




// 스크롤초기화
window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}

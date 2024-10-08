import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import sec5_1 from './srcImg/sec5-1.jpg'
import sec5_2 from './srcImg/sec5-2.jpg'
import sec5_3 from './srcImg/sec5-3.jpg'
import sec5_4 from './srcImg/sec5-4.jpg'
import sec5_5 from './srcImg/sec5-5.jpg'
import sec5_6 from './srcImg/sec5-6.jpg'
import sec5_7 from './srcImg/sec5-7.jpg'
import sec5_8 from './srcImg/sec5-8.jpg'
import sec5_9 from './srcImg/sec5-9.jpg'
import sec5_10 from './srcImg/sec5-10.jpg'
import sec5_11 from './srcImg/sec5-11.jpg'
import sec5_12 from './srcImg/sec5-12.jpg'
import sec5_13 from './srcImg/sec5-13.jpg'
import sec5_14 from './srcImg/sec5-14.jpg'
import sec5_15 from './srcImg/sec5-15.jpg'
import sec5_16 from './srcImg/sec5-16.jpg'
import sec5_17 from './srcImg/sec5-17.jpg'
import sec5_18 from './srcImg/sec5-18.jpg'
import sec5_19 from './srcImg/sec5-19.jpg'
import sec5_20 from './srcImg/sec5-20.jpg'
import sec5_21 from './srcImg/sec5-21.jpg'

const images = [
  sec5_1, sec5_2, sec5_3, sec5_4, sec5_5, sec5_6, sec5_7, sec5_8, sec5_9, sec5_10,
  sec5_11, sec5_12, sec5_13, sec5_14, sec5_15, sec5_16, sec5_17, sec5_18, sec5_19,
  sec5_20, sec5_21
]

const sketch = (p) =>{

    gsap.registerPlugin(ScrollTrigger)

    const sec3_wrapper = document.querySelector('.cheer-sector3__container')
    const Engine = Matter.Engine
    const World = Matter.World
    const Bodies = Matter.Bodies
    const Body = Matter.Body
    const Render = Matter.Render

    let engine
    let items = []
    let render

    p.setup = function(){
        let canvas = p.createCanvas(sec3_wrapper.clientWidth, sec3_wrapper.clientHeight)
        canvas.parent(sec3_wrapper)
    
        const s3_canvas = document.querySelector('.cheer-sector3 canvas')
    
        engine = Engine.create()
        engine.world.gravity.y = 0
    
        render = Render.create({
            canvas:s3_canvas,
            engine:engine,
            options:{
                width:canvas.width,
                height:canvas.height,
                pixelRatio: window.devicePixelRatio,
                wireframes: false,
                background: 'black',
                showBounds: false,
            }
        })
    
        add_boundries()
    
        for (let i = 0; i < 21; i++){
            let x = p.random(400, p.width - 400)
            let y = p.random(200, p.height - 200)
            // items.push(new Item(x,y, `../../project-img/img/main/sec5/sec5-${i + 1}.jpg`))
            items.push(new Item(x,y, images[i]))
        }
    
        
        /////////////////////////////////////////////////////////////////////////////////////sec3 scroll
        const sec3_item = document.querySelectorAll('.cheer-sector3__item')
    
        // sec3-scrollAni
        function sec3_scrollAni(){
            gsap.fromTo(sec3_item, {
                opacity: 0
            }, {
                opacity: 1,
                stagger: 0.05,
                duration: 1,
                scrollTrigger: {
                    trigger: '.cheer-sector3',
                    start: 'top bottom'
                }
            })
        }
        sec3_scrollAni()
    
    }
    
    // 엔진 작용 범위 테두리 설정
    function add_boundries(){
        const thickness = 50
        World.add(engine.world, [
            Bodies.rectangle(p.width / 2, -thickness / 2 , p.width, thickness, {
                isStatic:true,
            }),
            Bodies.rectangle(
                p.width / 2,
                p.height + thickness / 2,
                p.width,
                thickness,
                {
                    isStatic:true
                }
            ),
            Bodies.rectangle(-thickness / 2, p.height / 2, thickness, p.height, {
                isStatic:true,
            }),
            Bodies.rectangle(p.width + thickness / 2, p.height / 2, thickness, p.height, {
                isStatic:true,
            }),
        ])
    }
    
    p.draw = function(){
        Engine.update(engine)
        items.forEach((item)=>{
            item.update()
        })
    }
    
    
    
    class Item {
        constructor(x,y,img_url){
            this.angle = Math.random() * Math.PI * 2
            
            let options = {
                frictionAir:0.075,
                restitution:0.6,
                density:0.01,
                angle:this.angle,
                pixelRatio: window.devicePixelRatio,
                collisionFilter: {
                    group: -1
                }
            }
    
            this.body = Bodies.rectangle(x,y,200,250,options)
            World.add(engine.world, this.body)
    
            this.div = document.createElement('div')
            this.div.className = 'cheer-sector3__item'
            this.div.style.left = `${this.body.position.x - 100}px`
            this.div.style.top = `${this.body.position.y - 125}px`
            const img = document.createElement('img')
            img.src = img_url
            this.div.appendChild(img)
            sec3_wrapper.appendChild(this.div)
        }
    
        degree(){
            return this.angle
        }
    
        update(){
            this.div.style.left = `${this.body.position.x - 100}px`
            this.div.style.top = `${this.body.position.y - 125}px`
            this.div.style.transform = `rotate(${this.body.angle}rad)`
        }
    
        is_mouse_edge(mouseX, mouseY) {
            let half_width = 100
            let half_height = 125
        
            // 마우스와 박스의 거리
            let diagonal_dist       
            // // 오차 0~5픽셀정도
            const radius = Math.sqrt((half_width ** 2 + half_height ** 2))
            diagonal_dist = p.dist(mouseX, mouseY, this.body.position.x, this.body.position.y) - radius
        
            // 테두리 중 하나라도 10 픽셀 이내에 있는지 확인
            return (diagonal_dist < 5)
        }
    }
    
    p.mouseMoved = function(){
    
        items.forEach((item)=>{
            if(
                item.is_mouse_edge(p.mouseX, p.mouseY)
            ){
                // 마우스 들어온 각도
                let input_angle = p.atan2(item.body.position.x - p.mouseX, item.body.position.y - p.mouseY)            
    
                let force_magnitude = 2
                let distance_x = force_magnitude * Math.sin(input_angle)
                let distance_y = force_magnitude * Math.cos(input_angle)
                Body.applyForce(item.body, {
                    x:item.body.position.x,
                    y:item.body.position.y
                },{
                    x: distance_x,
                    y: distance_y
                })
            }
        })
    }
}




new p5(sketch)






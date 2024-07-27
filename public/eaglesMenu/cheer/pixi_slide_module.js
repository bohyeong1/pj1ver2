import { gsap } from "gsap"

export async function init_pixi(wrapper_class,canvas_class){
    ///슬라이더 요소 imgs    
    const img_data = ['../../project-img/img/main/sec4/s4-3.jpg', '../../project-img/img/cheer/cheer1.jpg', '../../project-img/img/main/sec5/sec5-7.jpg', '../../project-img/img/main/sec4/s4-4.jpg', '../../project-img/img/main/sec5/sec5-3.jpg', '../../project-img/img/main/sec5/sec5-19.jpg', '../../project-img/img/cheer/cheer6.jpg', '../../project-img/img/cheer/cheer8.jpg']
    const sub_text = ['Ha Ji Won', 'Kim Yeon Jeong','Park So Yeong','Kim Na Yeon','Woo Su Han','Lee Mi Rae','Choi Seok Hwa','Lee Ho Eun']
    
    const wrapper = document.querySelector(`.${wrapper_class}`)  ////래퍼
    const canvas = document.querySelector(`.${canvas_class}`)   ////pixi 요소 마운트하는 canvas
    PIXI.utils.skipHello()

    const app = new PIXI.Application({
        view: canvas,
        width: canvas.clientWidth, 
        height: canvas.clientHeight, 
        transparent: true,
        autoResize: true,
        resolution: window.devicePixelRatio, 
    })

    //// 변수
    let current_index = 0 //슬라이더 인덱스
    let is_load = false  // 화면 로드 state
    let slide_imgs  //각각의 이미지
    let slide_texts     //각각의 texts
    let is_play = false    //슬라이드 이동 에니메이션 state
    let posx = 0, posy = 0, vx = 0, vy = 0, kineX = 0, kineY = 0    ////마우스 이동 / 터치 이동 시 필요한 위치 값
    let is_swip = false    //스위핑
    let is_moving = false   //마우스 무브 state
    let texture   //텍스쳐
    let img_sprite    //이미지 스프라이트


    // 컨테이너 생성
    const stage = new PIXI.Container()  //루트 container
    const main_container = new PIXI.Container() //메인 view container
    const img_container =  new PIXI.Container() //이미지(슬라이드 요소) container
    const logo_container =  new PIXI.Container()    //메인 로고(cheerleader 들어가는곳) container
    const subtext_container =  new PIXI.Container()  ////서브 텍스트(치어리더 이름) container

    /////////////////////////// 필터 생성////////////////////////////////
    // 슬라이드 이동 필터
    const disp_sprite = new PIXI.Sprite.from('../../project-img/img/pixi/파동1.jpg')
    const disp_filter = new PIXI.filters.DisplacementFilter(disp_sprite)

    disp_sprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    disp_filter.autoFit = false
    disp_filter.padding = 0
    disp_sprite.anchor.set(0.5)
    disp_sprite.scale.x = 0
    disp_sprite.scale.y = 0

    // 마우스 이동 필터
    const disp_sprite_2 = PIXI.Sprite.from('../../project-img/img/pixi/파동2.jpg')
    const disp_filter_2 = new PIXI.filters.DisplacementFilter(disp_sprite_2)



    // colors filters
    const rgb_filter = new PIXI.filters.RGBSplitFilter()
    rgb_filter.red = [0,0]
    rgb_filter.green = [0,0]
    rgb_filter.blue = [0,0]


    //텍스쳐 로드
    function loadTexture(imageUrl) {
        return new Promise((resolve, reject) => {
            const texture = PIXI.Texture.from(imageUrl)
            texture.baseTexture.on('loaded', () => {
                resolve(texture)
            })
            texture.baseTexture.on('error', (error) => {
                reject(error)
            })
        })
    }

    // img 마운트
    for(let img of img_data){
        texture = await loadTexture(img)
        img_sprite = new PIXI.Sprite.from(texture)  
        

        // 개별 이미지 크기 및 위치
        img_sprite.anchor.set(0.5, 0.5)
        img_sprite.x = app.renderer.width / 2
        img_sprite.y = app.renderer.height / 1.8

        gsap.set(img_sprite, {
            alpha:0
        })

        cover_fit(img_sprite, app.renderer.width, app.renderer.height)
    }



    // cover_fit 함수 정의
    async function cover_fit(sprite, containerWidth, containerHeight) {
        const sprite_width = sprite.width
        const sprite_height = sprite.height
        const sprite_ratio = sprite_width / sprite_height
        const container_ratio = containerWidth / containerHeight

        // console.log(sprite.width)

        if (sprite_ratio < container_ratio) {
            // 스프라이트가 더 넓은 경우: 높이를 맞추고 너비를 확대
            sprite.width = containerWidth
            sprite.height = containerWidth / sprite_ratio
        } else {
            // 스프라이트가 더 높은 경우: 너비를 맞추고 높이를 확대
            sprite.height = containerHeight
            sprite.width = containerHeight * sprite_ratio
        }

        // 이미지 컨테이너에 추가
        img_container.addChild(img_sprite)
    }

    // font 로드
    await document.fonts.ready

    //텍스트 마운트
    function text_mount(){
        // 리사이즈
        let logo_size
        let sub_text_size
        let sub_top

        if(window.innerWidth < 768) {
            logo_size = 45
            sub_text_size = 20
            sub_top = 40
        }else{
            logo_size = 140
            sub_text_size = 30
            sub_top = 120
        }

        // logo
        const logo_title = new PIXI.Text('Cheer Leaders', {
            fontFamily: 'eng3-font',
            fontSize: logo_size,
            fontWeight: 400,
            fill:  'white',
            align: 'center',
            padding : 0,
            wordWrap: false,
            wordWrapWidth: app.renderer.width,
            letterSpacing: 3,
        })

        // 텍스트 포지션
        logo_title.anchor.set(0.5)
        logo_title.x = app.renderer.width / 2
        logo_title.y = app.renderer.height / 2

        // 컨테이너 추가
        logo_container.addChild(logo_title)

        // sub_text
        sub_text.forEach((el)=>{
            const sub = new PIXI.Text(el, {
                fontFamily: 'eng3-font',
                fontSize: sub_text_size,
                fontWeight: 400,
                fill:  'white',
                align: 'center',
                padding : 0,
                wordWrap: false,
                wordWrapWidth: app.renderer.width,
                letterSpacing: 3,
            })
    
            // 텍스트 포지션
            sub.anchor.set(0.5)
            sub.x = app.renderer.width / 2
            sub.y = app.renderer.height / 2 - sub_top
    
            gsap.set(sub, {
                alpha:0
            })

            // 컨테이너 추가
            subtext_container.addChild(sub)
        })
    }

    // 화면에 나오는 img, text 데이터
    slide_imgs = img_container.children
    slide_texts = subtext_container.children


    /////////////////////////////슬라이더 이동 에니메이션//////////////////////////////////
    function slide_move(next){
        // 필터 위치
        disp_sprite.anchor.set(0.5,0.5)
        disp_sprite.x = app.renderer.width / 2
        disp_sprite.y = app.renderer.height / 2

        const slide_tl = gsap.timeline({
            onStart:()=>{
                is_play = true,
                is_swip = false
            },
            onComplete:()=>{                

                rgb_filter.red = [0, 0]
                rgb_filter.blue = [0, 0]
                rgb_filter.green = [0, 0]

                current_index = next
                //초기 이미지 및 텍스트 화면 마운트 이후 슬라이드 버튼 클릭 시 필터 효과 추가
                is_load = true  
                is_play = false
                is_swip = false
            },
            onUpdate:()=>{
                disp_sprite.scale.set(slide_tl.progress() * 30)           
                
                if(slide_tl.progress() < 0.5) {
                    rgb_filter.red = [slide_tl.progress() * 10, 0]
                    rgb_filter.green = [0, 0]
                    rgb_filter.blue = [(-( slide_tl.progress() )), 0]
                }else{
                    rgb_filter.red = [-(10 - slide_tl.progress() * 10), 0]
                    rgb_filter.green = [0, 0]
                    rgb_filter.blue = [((10 - slide_tl.progress() * 10)), 0]
                }
            }
        })


        // 슬라이드 버튼 에니메이션 끝나기 전까지 막아놓기
        slide_tl.clear()
        if (slide_tl.isActive()) {
            return
        }

        // 첫번째 이미지 마운트 시 필터 효과 x
        let filter_scale
        if(!is_load){
            filter_scale = 0
        }else{
            filter_scale = 160
        }

        // 슬라이드 전환 에니메이션 gsap 연결
        slide_tl
        .to(disp_filter.scale, 1, {
            x: filter_scale,
            y: filter_scale,
            ease: 'Power2.easeIn'
        })        
        .to([slide_imgs[current_index], logo_container.children[0], slide_texts[current_index]], 1, {
                alpha: 0,
                ease: 'Power2.easeOut'
            }, 0.5)
        .to([slide_imgs[next], logo_container.children[0], slide_texts[next]], 1, {
                alpha: 1,
                ease: 'Power2.easeOut'
            }, 0.5)
        .to(disp_filter.scale, 1, {
            x: 0,
            y: 0,
            ease: 'Power1.easeOut'
        }, 1)
    }

    ////////////////////////////////////////////next, prev 버튼/////////////////////////
    function slide_btn_ani(){
        const slide_btns = Array.from(document.querySelectorAll('.cheer-sector1__canvas-nav a')) 
        slide_btns.forEach((el)=>{
            el.addEventListener('click',(e)=>{
                if(is_play){
                    return false
                }
                if (e.target.dataset.direction === 'next') {
                    if (current_index >= 0 && current_index < img_data.length - 1) {
                        slide_move(current_index + 1)
                    } else {
                        slide_move(0)
                    }
                } else {
                    if (current_index > 0 && current_index < img_data.length) {
                        slide_move(current_index - 1)
                    } else {
                        slide_move(img_data.length - 1)
                    }
                }
            })
        })
    }


    /////////////////////////////////////////////////////////////// 마우스 move 이벤트/////////////////////////////////////
    function mouse_move(){
        wrapper.addEventListener('mousemove',pointer_move)
        wrapper.addEventListener('touchmove',touch_move)

        function pointer_move(e) {
            posx = e.clientX
            posy = e.clientY
        }

        function touch_move(e) {
            posx = e.touches[0].clientX
            posy = e.touches[0].clientY
        }

        animation_loop()
    }

    function animation_loop(){

        let animation = requestAnimationFrame(animation_loop)

        //커서 위치 
        if(posy <= 0 || posx <= 0 || (posx >=  (wrapper.clientWidth - 2 ) || posy >= (wrapper.clientHeight - 2 ))) {
            is_moving = false
            posx = vx = window.innerWidth / 2
            posy = vy = window.innerHeight / 2             
            kineX = kineY = 0
        }
        else {
            is_moving = true
        }

        // vx의 위치를 posx위치에 수렴시키기 / 0.14 = 속도
        vx += ((posx - vx) * 0.14)
        vy += ((posy - vy) * 0.14)

        // kinX,Y 최신화
        kineX = Math.floor(posx - vx)
        kineY = Math.floor(posy - vy)

        // 텍스트 리빌 이벤트 -> 마우스 확 긁었을 때 화면 일그러지는 에니메이션

        // 마우스 이동
        if(is_moving) {
            disp_sprite_2.x = vx
            disp_sprite_2.y = vy 

            gsap.to(disp_filter_2.scale, 0.5, {
                    x: kineX * 0.8,
                    y: kineY *  0.8,
                    ease: 'Power4.easeOut'
            })
        }

        // 마우스 이동 중 필터 위치 마우스 위치로 점진적 동기화 시키기
        if (is_play) {
            disp_filter.x = vx
            disp_filter.y = vy
        }

        // 스위핑 이벤트(마우스 확 긁었을 때)
        if (is_swip) {           

            disp_sprite.x = vx
            disp_sprite.y = vy

            disp_filter.x = vx
            disp_filter.y = vy

            disp_filter.scale.x = kineX * 2
            disp_filter.scale. y = kineY * 2

            rgb_filter.red = [(kineX * 0.9), 0]
            rgb_filter.green = [0, 0]


        }
    }

    /////////////////////////////////////////////////////////////// 마우스 swip 이벤트/////////////////////////////////////
    let drag_start = 0

    function mouse_swip(){   
         
        main_container.on('pointerdown', on_drag_start)
                      .on('pointerup', on_drag_end)
                      .on('pointermove', on_drag_move)
            
        // 마우스 클릭
        function on_drag_start(e) {

            // 슬라이드 이벤트 중 에니메이션 방지
            if (is_play) {
                return
            }
            
            // 현제 커서 위치 저장
            this.data = e.data
            drag_start = this.data.getLocalPosition(this.parent)

            // 드래그 상태 true
            is_swip = true

            rgb_filter.red = [0, 0]
            rgb_filter.green = [0, 0]
            rgb_filter.blue = [0, 0]
        }
        
        // 마우스 업
        function on_drag_end() {           
            if (is_play) {
                return
            }            

            rgb_filter.red = [0, 0]
            rgb_filter.green = [0, 0]
            rgb_filter.blue = [0, 0]


            // 필터 초기화
            gsap.to(disp_filter.scale, 0.5, {
                x: 0,
                y: 0,
                ease: 'Power4.easeOut'
            })

            // 필터 위치 커서로 이동
            gsap.to(disp_filter, 0.5, {
                x: vx,
                y: vy,
                ease: 'Power4.easeOut'
            })

            
            this.data = null
            is_swip = false 


        }

        // 마우스 드래그
        function on_drag_move() {
            console.log('move')
            if (is_play) {
                return
            }
            if (is_swip) {
                // 마우스 클릭 후 드래그 한 위치
                let new_position = this.data.getLocalPosition(this.parent)
                
                // 이전 슬라이드로 이동
                if ((drag_start.x - new_position.x) < - window.innerWidth * 0.4) {
                    if (current_index > 0 && current_index < img_data.length) {
                        slide_move(current_index - 1)
                    } else {
                        slide_move(img_data.length - 1)
                    }
                }
                
                // 다음 슬라이드로 이동
                if ((drag_start.x - new_position.x) > window.innerWidth * 0.4) {
                    if (current_index >= 0 && current_index < img_data.length - 1) {
                        slide_move(current_index + 1)
                    } else {
                        slide_move(0)
                    }
                }
            }
        }
    }



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 화면 렌더 함수
    function init(){
        text_mount()        //텍스트 화면에 마운트
        slide_btn_ani()     //슬라이브 버튼 에니메이션
        slide_move(current_index)   //초기 이미지 및 화면 마운트
        mouse_move()    //마우스 이동 에니메이션
        mouse_swip()    //마우스 스윕 에니메이션
    
        // 메인 컨테이너(뷰) 컨테이너에 추가 / 커서 이벤트 활성화
        main_container.addChild(img_container,logo_container, subtext_container, disp_sprite_2)
        main_container.interactive = true
        // 최종 컨테이너에 추가
        stage.addChild(main_container,disp_sprite)
    
        // 기본 베이스 필터 추가
        stage.filters = [disp_filter]
        // logo_container.filters = [rgb_filter]
        // subtext_container.filters = [rgb_filter]
    
        // 마우스 이동 필터 추가
        logo_container.filters = [disp_filter_2, rgb_filter]
        subtext_container.filters = [disp_filter_2, rgb_filter]
        img_container.filters = [disp_filter_2]
    
        // 캔버스 최종 렌더
        app.stage.addChild(stage)
    }

    init()

}


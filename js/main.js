class Slider {
   $buttonPrev = document.querySelector('#slider-button-prev')
   $buttonNext = document.querySelector('#slider-button-next')
   $sliderWrapper = document.querySelector('#slider-wrapper')
   $slides = document.querySelectorAll('.slider__slide')
   $pagination = document.querySelector('.slider__pagination')

   currentSlide = 1
   slideTransform = 0

   slideAmount = this.$slides.length
   sliderWidth = this.$sliderWrapper.clientWidth

   constructor(options){
      this.speed = options.speed
   }

   init(){
      this.$buttonPrev.addEventListener('click', this.sliderPrev.bind(this))
      this.$buttonNext.addEventListener('click', this.sliderNext.bind(this))

      this.$slides.forEach(($slide) => {
         $slide.style.transitionDuration = `${this.speed}ms`
      })

      this.createPagination()
      this.setDisableButton()
      this.setPaginationActive()
      this.checkLastSlide()
   }

   createPagination(){
      this.$slides.forEach( () => {
         this.$pagination.insertAdjacentHTML('afterbegin', `
            <span></span>
         `)
      } )
   }

   sliderPrev(){
      // if (!this.allowMovePrev()) return

      this.currentSlide--
      this.slideTransform += this.sliderWidth
      
      this.setDisableButton()
      this.setTransform()
      this.setPaginationActive()
   }

   checkLastSlide(){
      if (this.currentSlide === this.slideAmount){
         this.currentSlide = 1
         this.slideTransform = 0

         this.setTransform()
         this.setPaginationActive()

         return true
      }

      return false
   }

   sliderNext(){
      // if (!this.allowMoveNext()) return
      if (this.checkLastSlide()) return
      
      this.currentSlide++
      this.slideTransform -= this.sliderWidth

      this.setDisableButton()
      this.setTransform()
      this.setPaginationActive()
   }
   setTransform(){
      this.$slides.forEach( ($slide) => {
         $slide.style.transform = `translate(${this.slideTransform}px, 0)`
      } )
   }
   allowMovePrev(){
      if (this.currentSlide === 1){
         return false
      }

      return true
   }

   setPaginationActive(){
      const $paginationPoints = this.$pagination.querySelectorAll('span')

      $paginationPoints.forEach($el => {
         $el.classList.remove('active')
      })

      $paginationPoints[this.currentSlide - 1].classList.add('active')
   }

   allowMoveNext(){
      if (this.currentSlide === this.slideAmount){
         return false
      }

      return true
   }

   setDisableButton(){
      this.$buttonPrev.classList.remove('disable')
      this.$buttonNext.classList.remove('disable')

      if (this.currentSlide === 1){
         this.$buttonPrev.classList.add('disable')
         return
      } 

      if (this.currentSlide === this.slideAmount){
         this.$buttonNext.classList.add('disable')
         return
      }
   }
}

const slider = new Slider({
   speed: 1000,
})

setInterval(() => {
   slider.sliderNext()
}, 1200)

slider.init()

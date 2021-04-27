<template>
  <div class="t-gameplay">
    <Popup
      v-show="isPopupVisible"
      :popupTitle="popupTitle"
      @closePopup="closePopup"
    />
    <router-link :to="{ name: 'hello-page' }">
      <span @click="setFieldExist">Start new game</span>
    </router-link>
    <div class="t-gameplay__container">
      <div
        v-for="card in this.cardsArr"
        :key="card.index"
        tag="div"
        class="t-gameplay__card"
        :class="card"
        :data-name="card"
      >
        <div class="flip-container" v-on:click="openCard">
          <div class="flipper">
            <div class="front"></div>
            <div class="back">
              <img :src="require('../assets/images/' + card + '.png')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="t-gameplay__level">Level {{ this.level }}</div>
    <div v-if="levelTimer > 0">{{ Math.round(levelTimer) }}</div>
    <button @click="levelUp" v-show="this.step === 2 || this.step === 4">
      Next level
    </button>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Popup from '../components/popup'
  import {openCard, annihilateCards} from '../common/mainFunctions'
  export default {
    name: 't-gameplay',
    data: () => ({
      cardsArr: [],
      clicksCounter: 0,
      step: 1,
      clicked: [],
      matches: 0,
      level: 1,
      levelTimer: 60,
      isPopupVisible: false,
      popupTitle: '',
      openCard: openCard,
      annihilateCards: annihilateCards,
      // timer: '',
    }),
    components: {
      Popup
    },
    computed: {
      ...mapGetters([
        'CARDS',
        'FIELD'
      ]),
    },
    created() {
      this.playSound('levelup'); 
    },
    mounted() {
      //проверка наличия поля при перезагрузке
      if (!this.FIELD) {
        const isFieldExist = true
        this.createField()
        this.setFieldExist(isFieldExist)
      }
      this.levelTimer = 60
      setInterval(() => {
        if (this.levelTimer > 0) {
          this.levelTimer = this.levelTimer - 0.1
          const frontCards = document.querySelectorAll('.front')
          for (let i = 0; i < frontCards.length && this.levelTimer > 1; i++) {
            // frontCards[i].style.background = 'linear-gradient(to top left, red '+(this.levelTimer*2-20)+'%, black 150%)' альтернативный вариант анимации
            frontCards[i].style.opacity = ((this.levelTimer + this.levelTimer/1.5)/100)
          }
        } else {
          this.showPopup('Time is over! Try again.')
        }
      }, 100)
    },
    methods: {
      ...mapActions([
        'CHANGE_IS_FIELD_EXIST'
        ]),
      showPopup(content) {
        this.popupTitle = content
        this.isPopupVisible = true
      },
      closePopup() {
        this.isPopupVisible = false
        this.$router.push('/')
      },
      showLevel() {
        this.step == 3 ? this.level = this.step - 1 : this.level = this.step - 2
      },
      levelUp() {
        try {
          console.log('3432')
          this.playSound('levelup')
          // восстанавливаем начальное состояние карточек
          let deletedCards = document.querySelectorAll('.flipper')
          let emptyCards = document.querySelectorAll("section")
          for (let i = 0; i < emptyCards.length; i++) {
            deletedCards[i].parentNode.classList.remove('no-click')
            emptyCards[i].remove();
            deletedCards[i].style.display ? deletedCards[i].style.display = 'block' : void 0;
          }
          //создаем новое поле
          this.createField(this.step)
          document.querySelector('button').style.display = 'none'
          let gameWindow = document.querySelector('.t-gameplay__container')
          if (this.step === 2) {
            gameWindow.style.width = '880px'
          } else {
            gameWindow.style.width = '1100px'
          }
          this.level++
          this.step++
          this.matches = 0
          this.showLevel()
          this.levelTimer = 60
        } catch (e) {
          console.log(e)
        }
      },
      setFieldExist(isFieldExist) {
        this.CHANGE_IS_FIELD_EXIST(isFieldExist)
        clearInterval(this.timer)
        console.log('timer stopped')
      },
      createField(value) {
        //создаем массив с нужным количеством карточек
        this.cardsArr = this.CARDS.slice()
        this.cardsArr.push(...this.cardsArr)
        this.cardsArr.push(...this.cardsArr)
        // создаем две пары недостающих карточек для второго раунда
        const twoPars = this.CARDS.slice(2)
        twoPars.push(...twoPars)
        if (value === 2) {
          this.cardsArr.push(...this.cardsArr)
        }
        if (value === 4) {
          this.cardsArr.push(...this.cardsArr)
          this.cardsArr.push(...this.cardsArr)
          this.cardsArr.splice(-8)
          this.cardsArr.push(...twoPars)
        }
        this.cardsArr.sort(function() {
          return Math.random() - 0.5
        })
      },
      playSound(value) {
        const audio = new Audio()
        audio.preload = 'auto'
        audio.src = require('../assets/sounds/' + value + '.mp3')
        audio.play()
      },
      removeClickedClass() {
          const clickedCards = document.querySelectorAll('.clicked')
          for (let i = 0; i < clickedCards.length; i++) {
          clickedCards[i].classList.remove('clicked')
        }
      },
      addClickedClass(e) {
        this.clicked.push(e.target.parentNode.parentNode.parentNode.dataset.name)
        e.target.parentNode.parentNode.classList.add('clicked')
        this.clicksCounter++
      },
    }
  }
</script>

<style>
</style>

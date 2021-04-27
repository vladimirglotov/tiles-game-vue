export function openCard(e) {
  //проверка на кликабельность
  if (!e.target.classList.contains('no-click') && e.target.tagName !== 'SECTION') {
    //проверка на порядковый номер клика и завепшенность удаления классов при неверном выборе
    if (this.clicksCounter === 0 && this.clicked.length == 0) {
      this.addClickedClass(e);
      console.log('первый клик')
    } else if (this.clicksCounter === 1 && !e.target.parentNode.parentNode.classList.contains('clicked') && this.clicked.length == 1) {
      console.log('второй клик')
      this.addClickedClass(e)
      //проверка на совпадение одиновых карточек
      if (this.clicked[0] === this.clicked[1]) {
        console.log('совпадение')
        this.annihilateCards()
        this.matches++
        //проверка на завершенность уровня и возможную победу
        if (this.step == 1 && this.matches == 8 || this.step == 3 && this.matches == 16) {
          this.step++
        }
        if (this.step === 5 && this.matches === 30) {
          this.playSound('win')
          setTimeout(() => {
            this.showPopup('Вы выиграли!!!')
            this.$router.push('/')
          }, 7000)
        }
      } else {
        //после задержки прячем картинку обратно, чтобы ее можно было успеть увидеть
        console.log('неверный выбор')
        this.clicksCounter = 3
        setTimeout(() => {
          this.removeClickedClass()
          this.clicksCounter = 0
        }, 500)
        this.clicked = []
      }
    }
  }
}

export function annihilateCards() {
  this.playSound('done')
  setTimeout(() => {
    //убираем видимость совпавших карточек и добавляем взамен пустые окна, делаем их некликабельными
    let cardsToDelete = document.querySelectorAll('.flipper')
    for (let i = 0; i < cardsToDelete.length; i++) {
      if (cardsToDelete[i].parentNode.classList.contains('clicked')) {
        cardsToDelete[i].parentNode.classList.add('no-click')
        let emptyCards = document.createElement("section")
        cardsToDelete[i].parentNode.insertBefore(emptyCards, cardsToDelete[i])
        cardsToDelete[i].style.display = 'none'
      }
    }
    //сброс переменных для следующего хода
    this.clicked = []
    this.removeClickedClass()
    this.clicksCounter = 0
  }, 500)
}

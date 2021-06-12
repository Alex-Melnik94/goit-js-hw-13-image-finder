import './sass/main.scss';
import imageCard from './templates/image-card.hbs'
import ApiService from './apiService';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';


const listEl = document.querySelector('.js-gallery')
const formEl = document.querySelector('#search-form')
const loadMoreBtn = document.querySelector('.load-more-btn')
const scrollToEl = document.querySelector('.scroll-div')


const apiService = new ApiService()

formEl.addEventListener('submit', onSubmit)
loadMoreBtn.addEventListener('click', onBtnClick)

function onSubmit(e) {
    e.preventDefault()
    apiService.query = e.currentTarget.elements.query.value.trim()
    if (apiService.query === '') {
        error({
           title: 'Input field is empty! Images not found.',
           delay: 2000
       });
        return
    }
    apiService.resetPage()
    listEl.innerHTML = ''
    apiService.fetchImgs().then(renderMarkup)
    loadMoreBtn.classList.remove('visually-hidden')
}

function renderMarkup(response) {
    if (response.length === 0) {
       error({
           title: 'Bad request! Images not found.',
           delay: 2000
       });
    loadMoreBtn.classList.add('visually-hidden')
    }
    const imgListMarkup = imageCard(response)
    listEl.insertAdjacentHTML('beforeend', imgListMarkup)
}

function onBtnClick() {
    if (apiService.query === '') {
        return
    }
   
    apiService.incrementPage()
    apiService.fetchImgs().then(renderMarkup).then(r => {
        setTimeout(() => {
            scrollToEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            });
        }, 300)
        
      })
}







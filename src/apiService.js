const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q='
const API_KEY = '21964701-aaf906e928d661c46acce114f'


export default class apiService {
    constructor() {
        this.searchQuery = ''
        this.page = 1
    }

    fetchImgs() {
      return fetch(`${BASE_URL}${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(r => r.json())
          .then(response => {
            this.incrementPage
            return response.hits
            })
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}
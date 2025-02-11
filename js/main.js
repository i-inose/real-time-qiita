const app = Vue.createApp({
	data: () => ({
		items: null,
		keyword: "",
		message: ""
	}),
	watch: {
		keyword: function(newKeyword, oldKeyword) {
			this.message = "Waiting for you to stop typing..."
			this.debouncedGetAnswer()
		}
	},
	mounted: function () {
		this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
	},
	methods: {
		getAnswer: function () {
			if(this.keyword === "") {
				this.items = null
				return
			}

			this.message = "Lading..."
			const vm = this
			const params = { page: 1, per_page: 20, query: this.keyword }
			axios.get("https://qiita.com/api/v2/items", { params }).then(function(response){
				vm.items = response.data
			})
			.catch(function(error){
				vm.message = "Error!" + error
			})
			.finally(function() {
				vm.message = ""
			})
		}
	}
})
app.mount("#app")
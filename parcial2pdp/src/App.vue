<template>
	<div>
		<form @submit.prevent="statusEdit ? editBook() : addBook()">
			<div id="container"><h2>Parcial 2 (PDP)</h2><h3>Book info (title, author):</h3></div>
			<p>	
				<input type="text" v-model="title" id="titleInput">
				<input type="text" v-model="author" id="authorInput">
				<button type="submit" id="submitButton">{{statusEdit ? "Edit book" : "Add book"}}
				</button>
				<button v-if="statusEdit" @click="cancelEdit()">Cancel</button>
			</p>
		</form>
		<img src="@/assets/loading.gif" v-if="loading">
		<ul>
			<li v-for="book in books" :key="book.id">
				{{book.title}}<span id="author"> — by {{book.author}} — </span>
				<span id="buttons">
				<button @click="selectBook(book)">Edit</button>
				<button @click="deleteBook(book)">Delete</button></span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {db} from './firebase'
	export default {
		name: 'App',
		data() {
			return {
				books: [],
				id: "",
				title: "",
				author: "",
				loading: false,
				statusEdit: false
			}
		},
		created() {
			this.listBooks()
		},
		methods: {
			async listBooks() {
				this.loading = true
				const data = await db.collection("books").get()
				this.books = data.docs.map(doc => ({
					id: doc.id, ...doc.data()
				}))
				this.loading = false
			},
			async addBook() {
				await db.collection('books').add({title: this.title, author: this.author})
				this.title = ""
				this.author = ""
				this.listBooks()
			},
			async deleteBook(book) {
				if(confirm(`Do you really want to delete ${book.title}, by ${book.author}?`)) {
					this.loading = true
					await db.collection('books').doc(book.id).delete()
					this.loading = false
					this.listBooks()
				}
			},
			selectBook(book) {
				this.statusEdit = true
				this.id = book.id
				this.title = book.title
				this.author = book.author
			},
			async editBook() {
				await db.collection('books').doc(this.id).set({
					title: this.title,
					author: this.author
				})
				this.statusEdit = false
				this.id = ""
				this.title = ""
				this.author = ""
				this.listBooks()
			},
			cancelEdit() {
				this.statusEdit = false
				this.title = ''
				this.author = ''
			}
		}
	}
</script>
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://curlos:carlos26@cluster0.buzym.mongodb.net/<dbname>?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

Book.find({}).then(book => console.log(book));

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]
    id: ID!
  }
  type Author {
    name: String
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }
  type Mutation {
      addBook(
          title: String!
          name: String!
          born: Int
          published: Int!
          genres: [String!]!
      ): Book
      editAuthor(
          name: String!
          born: Int!
      ): Author
  }

`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: (root, args) => {
          if(args.author && !args.genre) {
              return Book.find({"author.name": args.author});
          }

          if(!args.author && args.genre) {
              return Book.find({"genres": args.genre});
          }

          if(args.author && args.genre) {
            const byAuthor = (book) => {
                return (
                    args.author === book.author ? book.title && book.genres : !book
                )
            }
            const booksByAuthor = books.filter(byAuthor)

            const byGenre = (book) => {
                return (
                    book.genres.includes(args.genre) ? book.title && book.author : !book
                )
              }

              return booksByAuthor.filter(byGenre)
          }

          console.log('hello');

          return Book.find({})
      },
      allAuthors: () => Author.find({})
  },
  Author: {
      bookCount: (root) => {
        let bookCount = 0
        Book.find({}).map(book => book.author === root.name ? bookCount++ : bookCount)
        return bookCount
      }
  },
  Mutation: {
      addBook: async (root, args) => {
        const existingAuthor = await Author.findOne({name: args.name})
        console.log('fuck you nigga')
        console.log(existingAuthor)

        if(existingAuthor != null) {
          const book = new Book({
            title: args.title, 
            author: existingAuthor, 
            published: args.published, 
            genres: args.genres
          })
          return book.save()
        }
        const author = new Author({name: args.name})
        await author.save()

        const book = new Book({
          title: args.title, 
          author: author, 
          published: args.published, 
          genres: args.genres
        })
        return book.save()
      },
      editAuthor: (root, args) => {
        const author = authors.find(a => a.name === args.name)
        if(!author) {
            return null
        }

        const updatedAuthor = {...author, born: args.born}
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        return updatedAuthor
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Item = require('./models/item')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/items', (request, response, next) => {
  Item.find({})
    .then(persitemsons => {
      response.json(items.map(item => item.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/api/items/info', (request, response) => {
  Item.find({})
    .then(items => {
      const elements = Object.keys(items).length
      const date = new Date()
      response.set('Content-Type', 'text/html')
      response.send(`<p>Shppoing list has info for ${elements} items</p><p>${date}</p>`)
    })

})

app.get('/api/items/:id', (request, response, next) => {
  Item.findById(request.params.id)
    .then(items => {
      if (item) {
        response.json(item.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/items/:id', (request, response, next) => {
  Item.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/items/:id', (request, response, next) => {
  const body = request.body

  const item = {
    name: body.name,
  }

  Item.findByIdAndUpdate(request.params.id, item, { new: true })
    .then(updatedItem => {
      response.json(updatedItem.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/items', (request, response, next) => {
  const body = request.body

  const item = new Item ({
    name: body.name,
  })

  /*const duplicated = items.find(item => item.name === body.name)
  if (duplicated) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }*/

  item
    .save()
    .then(savedItem => savedItem.toJSON())
    .then(savedAndFormattedItem => {
      response.json(savedAndFormattedItem)})
    .catch(error => next(error))
})

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
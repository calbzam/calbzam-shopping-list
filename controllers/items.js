
const itemsRouter = require('express').Router()
const Item = require('./models/item')

itemsRouter.get('/api/items', (request, response, next) => {
  Person.find({})
    .then(items => {
      response.json(items.map(item => item.toJSON()))
    })
    .catch(error => next(error))
})

itemsRouter.get('/api/items/info', (request, response) => {
  Item.find({})
    .then(items => {
      const items = Object.keys(items).length
      const date = new Date()
      response.set('Content-Type', 'text/html')
      response.send(`<p>Shopping list has info for ${items} items</p><p>${date}</p>`)
    })

})

itemsRouter.get('/api/items/:id', (request, response, next) => {
  Item.findById(request.params.id)
    .then(item => {
      if (item) {
        response.json(item.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


itemsRouter.delete('/api/items/:id', (request, response, next) => {
  Item.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

itemsRouter.put('/api/items/:id', (request, response, next) => {
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

itemsRouter.post('/api/persons', (request, response, next) => {
  const body = request.body

  const item = new Item({
    name: body.name,
  })

  /*const duplicated = persons.find(person => person.name === body.name)
    if (duplicated) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }*/

  item
    .save()
    .then(savedItem => savedItem.toJSON())
    .then(savedAndFormattedItem => {
      response.json(savedAndFormattedItem)
    })
    .catch(error => next(error))
})

module.exports = itemsRouter
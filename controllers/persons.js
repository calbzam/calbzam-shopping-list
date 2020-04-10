
const personsRouter = require('express').Router()
const Person = require('./models/person')

personsRouter.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

personsRouter.get('/api/persons/info', (request, response) => {
  Person.find({})
    .then(persons => {
      const people = Object.keys(persons).length
      const date = new Date()
      response.set('Content-Type', 'text/html')
      response.send(`<p>Phonebook has info for ${people} people</p><p>${date}</p>`)
    })

})

personsRouter.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


personsRouter.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

personsRouter.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }


  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

personsRouter.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  /*const duplicated = persons.find(person => person.name === body.name)
    if (duplicated) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }*/

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter
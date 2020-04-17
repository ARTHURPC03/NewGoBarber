import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentRepository from '../repositories/AppoitmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  })

  return response.json(appointment)
})

export default appointmentsRouter

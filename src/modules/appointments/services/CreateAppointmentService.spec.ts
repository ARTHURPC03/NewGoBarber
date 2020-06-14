import AppError from '@shared/errors/AppError'

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    )

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    )

    const appointmentDate = new Date(2020, 6, 15, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    )

    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3)
  // })
})

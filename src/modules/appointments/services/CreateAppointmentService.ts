import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const checkProviderExists = await this.usersRepository.findById(provider_id)

    if (!checkProviderExists) throw new AppError('Provider not found')

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    )

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked')

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError("You can't create an appointment on a past Date")

    if (user_id === provider_id)
      throw new AppError("You can't create an appointment with yourself")

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('You can only create appointments between 8am and 5pm')

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${formattedDate}`,
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    )

    return appointment
  }
}

export default CreateAppointmentService

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('timestamp without time zone')
  date: Date
}

export default Appointment

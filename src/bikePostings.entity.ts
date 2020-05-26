import {
  Entity,
  Column,
} from 'typeorm';
import {Base} from './base.entity';

@Entity('bikePostings')
export class BikePostingsEntity extends Base {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', unique: true })
  pageUrl: string;

  @Column({
    type: 'text',
  })
  dateTime: string;

  @Column({
    type: 'text',
  })
  geoLocation: string;
}

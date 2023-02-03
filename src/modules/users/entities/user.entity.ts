import { Document } from 'src/modules/document/entities/document.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  pass: string;

  @Column()
  isActive: boolean;

  @Column({ array: true })
  documents: number;
}

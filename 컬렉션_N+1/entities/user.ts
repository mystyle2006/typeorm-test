import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @OneToMany(() => Photo, (photo) => photo.user, { cascade: true })
  photos: Promise<Photo[]>;
}
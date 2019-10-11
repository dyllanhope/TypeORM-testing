import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from "typeorm";
import { Waiters } from "./Waiters";

@Entity()
export class Shifts extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weekday: string;

    @ManyToMany(type => Waiters, waiters => waiters.days)
    waiters_on_day: Waiters[];
}
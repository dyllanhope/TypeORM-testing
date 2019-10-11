import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Waiters } from "./Waiters";

@Entity()
export class Shifts {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weekday: string;

    @ManyToMany(type => Waiters, waiters => waiters.days)
    waiters_on_day: Waiters[];
}
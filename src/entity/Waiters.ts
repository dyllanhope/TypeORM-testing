import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Shifts } from "./Shifts";

@Entity()
export class Waiters {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @ManyToMany(type => Shifts, shift => shift.waiters_on_day)
    @JoinTable()
    days: Shifts[]

}

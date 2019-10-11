import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Shifts {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weekday: string;

    @Column()
    waiters_on_day: number;
}
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

}

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryColumn,
} from "typeorm";
import { House } from "./house";

@Entity()
export class Character {
	@PrimaryColumn()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	title: string;

	@Column({ default: true })
	alive: boolean;

	@ManyToOne(
		() => House,
		(house: House) => house.characters,
		{ nullable: false },
	)
	house: House;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

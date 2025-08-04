import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryColumn,
} from "typeorm";
import { Character } from "./character";

@Entity()
export class House {
	@PrimaryColumn()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	region: string;

	@Column({ unique: true })
	slug: string;

	@Column({ nullable: true })
	words: string; // девиз дома

	@OneToMany(
		() => Character,
		(character: Character) => character.house,
	)
	characters: Character[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

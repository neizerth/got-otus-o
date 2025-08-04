import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { House } from "../../entity/house";

export default class HouseSeeder implements Seeder {
	public async run(dataSource: DataSource): Promise<void> {
		const repo = dataSource.getRepository(House);

		const houses = [
			{
				name: "House Stark",
				region: "The North",
				slug: "stark",
				words: "Winter is Coming",
			},
			{
				name: "House Lannister",
				region: "The Westerlands",
				slug: "lannister",
				words: "Hear Me Roar!",
			},
			{
				name: "House Targaryen",
				region: "Dragonstone",
				slug: "targaryen",
				words: "Fire and Blood",
			},
			{
				name: "House Baratheon",
				region: "The Stormlands",
				slug: "baratheon",
				words: "Ours is the Fury",
			},
			{
				name: "House Greyjoy",
				region: "Iron Islands",
				slug: "greyjoy",
				words: "We Do Not Sow",
			},
		];

		for (const data of houses) {
			const exists = await repo.findOneBy({ name: data.name });
			if (!exists) {
				await repo.save(repo.create(data));
				console.log(`Seeded: ${data.name}`);
			}
		}
	}
}

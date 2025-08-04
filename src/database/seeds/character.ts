import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Character } from "../../entity/character";
import { House } from "../../entity/house";

export default class CharacterSeeder implements Seeder {
	public async run(dataSource: DataSource): Promise<void> {
		const characterRepo = dataSource.getRepository(Character);
		const houseRepo = dataSource.getRepository(House);

		// Берём все дома из базы
		const houses = await houseRepo.find();

		// Подготовим персонажей для каждого дома
		const charactersData: {
			[key: string]: Array<{ name: string; alive: boolean }>;
		} = {
			stark: [
				{ name: "Eddard Stark", alive: false },
				{ name: "Arya Stark", alive: true },
				{ name: "Jon Snow", alive: true },
			],
			lannister: [
				{ name: "Tyrion Lannister", alive: true },
				{ name: "Cersei Lannister", alive: false },
			],
			targaryen: [{ name: "Daenerys Targaryen", alive: false }],
			baratheon: [
				{ name: "Robert Baratheon", alive: false },
				{ name: "Stannis Baratheon", alive: false },
			],
			greyjoy: [
				{ name: "Theon Greyjoy", alive: true },
				{ name: "Balon Greyjoy", alive: false },
			],
		};

		for (const house of houses) {
			const chars = charactersData[house.slug];
			if (!chars) continue;

			for (const charData of chars) {
				const exists = await characterRepo.findOneBy({ name: charData.name });
				if (!exists) {
					const character = characterRepo.create({
						...charData,
						house: house,
					});
					await characterRepo.save(character);
					console.log(`Seeded character: ${charData.name}`);
				}
			}
		}
	}
}

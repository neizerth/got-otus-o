import { Router } from "express";
import { Character } from "../entity/character";
import { House } from "../entity/house";
import { AppDataSource } from "../config/data-source";

const router = Router();
const characterRepo = AppDataSource.getRepository(Character);
const houseRepo = AppDataSource.getRepository(House);

// Получить всех персонажей, с опциональным фильтром по дому (slug)
// GET /characters?house=stark
router.get("/", async (req, res) => {
	try {
		const houseSlug = req.query.house as string | undefined;

		let characters: Character[];

		if (houseSlug) {
			const house = await houseRepo.findOneBy({ slug: houseSlug });
			if (!house) {
				return res.status(404).json({ message: "House not found" });
			}
			characters = await characterRepo.find({
				where: { house: { id: house.id } },
				relations: ["house"],
			});
		} else {
			characters = await characterRepo.find({ relations: ["house"] });
		}

		res.json(characters);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Получить персонажа по id
// GET /characters/:id
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const character = await characterRepo.findOne({
			where: { id },
			relations: ["house"],
		});

		if (!character) {
			return res.status(404).json({ message: "Character not found" });
		}

		res.json(character);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Создать нового персонажа
// POST /characters
/*
  JSON тело:
  {
    "name": "Arya Stark",
    "alive": true,
    "houseSlug": "stark"
  }
*/
router.post("/", async (req, res) => {
	try {
		const { name, alive, houseSlug } = req.body;

		if (!name || typeof alive !== "boolean" || !houseSlug) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const house = await houseRepo.findOneBy({ slug: houseSlug });
		if (!house) {
			return res.status(404).json({ message: "House not found" });
		}

		const character = characterRepo.create({
			name,
			alive,
			house,
		});

		await characterRepo.save(character);

		res.status(201).json(character);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Обновить персонажа
// PUT /characters/:id
/*
  JSON тело может содержать:
  {
    "name": "New Name",
    "alive": false,
    "houseSlug": "lannister"
  }
*/
router.put("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const { name, alive, houseSlug } = req.body;

		const character = await characterRepo.findOne({
			where: { id },
			relations: ["house"],
		});

		if (!character) {
			return res.status(404).json({ message: "Character not found" });
		}

		if (name !== undefined) character.name = name;
		if (alive !== undefined) character.alive = alive;

		if (houseSlug !== undefined) {
			const house = await houseRepo.findOneBy({ slug: houseSlug });
			if (!house) {
				return res.status(404).json({ message: "House not found" });
			}
			character.house = house;
		}

		await characterRepo.save(character);

		res.json(character);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Удалить персонажа
// DELETE /characters/:id
router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const character = await characterRepo.findOneBy({ id });
		if (!character) {
			return res.status(404).json({ message: "Character not found" });
		}

		await characterRepo.remove(character);

		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;

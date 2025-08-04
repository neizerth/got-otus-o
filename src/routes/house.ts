import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { House } from "../entity/house";

const router = Router();
const houseRepo = AppDataSource.getRepository(House);

// GET /houses — получить все дома
router.get("/", async (_: Request, res: Response) => {
	const houses = await houseRepo.find({
		order: { name: "ASC" },
	});
	res.json(houses);
});

// GET /houses/:id — получить дом по ID
router.get("/:id", async (req: Request, res: Response) => {
	const house = await houseRepo.findOneBy({ id: req.params.id });

	if (!house) {
		return res.status(404).json({ message: "House not found" });
	}

	res.json(house);
});

// POST /houses — создать новый дом
router.post("/", async (req: Request, res: Response) => {
	const { name, region, words, slug } = req.body;

	if (!name) {
		return res.status(400).json({ message: "Name is required" });
	}

	const newHouse = houseRepo.create({ name, region, words, slug });
	const saved = await houseRepo.save(newHouse);

	res.status(201).json(saved);
});

// PUT /houses/:id — обновить дом
router.put("/:id", async (req: Request, res: Response) => {
	const house = await houseRepo.findOneBy({ id: req.params.id });

	if (!house) {
		return res.status(404).json({ message: "House not found" });
	}

	houseRepo.merge(house, req.body);
	const updated = await houseRepo.save(house);

	res.json(updated);
});

// DELETE /houses/:id — удалить дом
router.delete("/:id", async (req: Request, res: Response) => {
	const result = await houseRepo.delete(req.params.id);

	if (result.affected === 0) {
		return res.status(404).json({ message: "House not found" });
	}

	res.status(204).send();
});

export default router;

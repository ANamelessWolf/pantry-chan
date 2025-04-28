/**
 * @openapi
 * /category:
 *   get:
 *     summary: Get all food categories
 *     tags: [FoodCategory]
 *     responses:
 *       200:
 *         description: List of food categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodCategory'

 *   post:
 *     summary: Create a food category
 *     tags: [FoodCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodCategory'
 *     responses:
 *       201:
 *         description: Food category created
 */

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     summary: Get food category by ID
 *     tags: [FoodCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single food category
 */

/**
 * @openapi
 * /category/{id}:
 *   put:
 *     summary: Update food category by ID
 *     tags: [FoodCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodCategory'
 *     responses:
 *       200:
 *         description: Food category updated
 */

/**
 * @openapi
 * /category/{id}:
 *   delete:
 *     summary: Delete food category by ID
 *     tags: [FoodCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Food category deleted
 */

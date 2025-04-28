/**
 * @openapi
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: List of recipes
 */

/**
 * @openapi
 * /recipe:
 *   post:
 *     summary: Create a recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe created
 */

/**
 * @openapi
 * /recipe/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single recipe
 */

/**
 * @openapi
 * /recipe/{id}:
 *   put:
 *     summary: Update recipe by ID
 *     tags: [Recipe]
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
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Recipe updated
 */

/**
 * @openapi
 * /recipe/{id}:
 *   delete:
 *     summary: Delete recipe
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Recipe deleted
 */

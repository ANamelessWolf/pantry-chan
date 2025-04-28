/**
 * @openapi
 * /food:
 *   get:
 *     summary: Get all foods
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: List of foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'

 *   post:
 *     summary: Create a food
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Food created
 */

/**
 * @openapi
 * /food/{id}:
 *   get:
 *     summary: Get food by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single food item
 */

/**
 * @openapi
 * /food/{id}:
 *   put:
 *     summary: Update food by ID
 *     tags: [Food]
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
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Food updated
 */

/**
 * @openapi
 * /food/{id}:
 *   delete:
 *     summary: Delete food by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Food deleted
 */

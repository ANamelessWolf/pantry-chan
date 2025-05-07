/**
 * @openapi
 * /food:
 *   get:
 *     summary: Get all foods
 *     tags: [Food]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category UUID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Case-insensitive name search
 *       - in: query
 *         name: macros
 *         schema:
 *           type: string
 *         description: >
 *           JSON stringified array of macro filters.
 *           Example: [{"key":"Calories","compare":"MoreThan","value":100}]
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success response with a list of foods
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpFoodListResponse'

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpFoodItemResponse'
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
 *         description: Single food item response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpFoodItemResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpFoodItemResponse'
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
 *         description: Food deleted successfully
 */

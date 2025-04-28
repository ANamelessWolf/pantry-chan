/**
 * @openapi
 * /unit:
 *   get:
 *     summary: Get all units
 *     tags: [Unit]
 *     responses:
 *       200:
 *         description: List of units
 */

/**
 * @openapi
 * /unit:
 *   post:
 *     summary: Create a unit
 *     tags: [Unit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Unit'
 *     responses:
 *       201:
 *         description: Unit created
 */

/**
 * @openapi
 * /unit/{id}:
 *   get:
 *     summary: Get unit by ID
 *     tags: [Unit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single unit
 */

/**
 * @openapi
 * /unit/{id}:
 *   put:
 *     summary: Update unit
 *     tags: [Unit]
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
 *             $ref: '#/components/schemas/Unit'
 *     responses:
 *       200:
 *         description: Unit updated
 */

/**
 * @openapi
 * /unit/{id}:
 *   delete:
 *     summary: Delete unit
 *     tags: [Unit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Unit deleted
 */

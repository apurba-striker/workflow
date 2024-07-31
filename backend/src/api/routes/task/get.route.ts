import express from 'express';
import { getTasks } from '../../controllers/task/get.controller';
import { authenticateJWT } from '../../middlewares/auth/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /task:
 *   get:
 *     summary: Get tasks for authenticated user
 *     description: Retrieves tasks for the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d5ecb54c4d7b2e1c5e1b2b"
 *                       title:
 *                         type: string
 *                         example: "Complete project report"
 *                       description:
 *                         type: string
 *                         example: "Write and submit the final project report"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-15T00:00:00Z"
 *                 totalCount:
 *                   type: integer
 *                   example: 42
 *       401:
 *         description: Unauthorized - invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get('/', authenticateJWT, getTasks);

export default router;
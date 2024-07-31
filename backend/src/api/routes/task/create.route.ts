import express from 'express';
import { createTask } from '../../controllers/task/create.controller';
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
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Complete project proposal"
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 *                 example: "Draft and submit the Q3 project proposal"
 *               status:
 *                 type: string
 *                 enum: [TO_DO, IN_PROGRESS, UNDER_REVIEW, COMPLETED]
 *                 description: The current status of the task
 *                 example: "TO_DO"
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, URGENT]
 *                 description: The priority level of the task
 *                 example: "MEDIUM"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: The deadline for the task
 *                 example: "2023-08-31T00:00:00Z"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Task created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     task:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "60d5ecb54c4d7b2e1c5e1b2b"
 *                         title:
 *                           type: string
 *                           example: "Complete project proposal"
 *                         description:
 *                           type: string
 *                           example: "Draft and submit the Q3 project proposal"
 *                         status:
 *                           type: string
 *                           example: "TO_DO"
 *                         priority:
 *                           type: string
 *                           example: "MEDIUM"
 *                         deadline:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-08-31T00:00:00Z"
 *                         userId:
 *                           type: string
 *                           example: "60d5ecb54c4d7b2e1c5e1b2a"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-07-30T12:00:00Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-07-30T12:00:00Z"
 *       400:
 *         description: Bad request - invalid input data
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
 *                   example: "Title is required, Status is required"
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
router.post('/', authenticateJWT, createTask);

export default router;
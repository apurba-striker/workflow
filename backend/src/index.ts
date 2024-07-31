import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { swaggerUi, swaggerDocs } from './docs/swagger';
import passport from "passport";
import cookieSession from "cookie-session";
import helmet from 'helmet';
import dotenv from "dotenv";

import router from './router'
import { GitHubAuthService } from './api/services/auth/oauth/github/github.ouath.service';
import { GoogleAuthService } from './api/services/auth/oauth/google/google.oauth.service';
import { FacebookAuthService } from './api/services/auth/oauth/facebook/facebook.oauth.service';

class App {
    public app: express.Application;
    private gitHubAuthService: GitHubAuthService;
    private googleAuthService: GoogleAuthService;
    private facebookAuthService: FacebookAuthService;
    private secretKey: string;

    constructor() {
        this.loadEnvironmentVariables();
        this.app = express();
        this.gitHubAuthService = new GitHubAuthService();
        this.googleAuthService = new GoogleAuthService();
        this.facebookAuthService = new FacebookAuthService();
        this.secretKey = this.getSecretKey();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private loadEnvironmentVariables(): void {
        dotenv.config();
    }

    private getSecretKey(): string {
        const key = process.env.SESSION_SECRET_KEY;
        if (!key) {
            if (process.env.NODE_ENV === 'production') {
                throw new Error('ERROR: SESSION_SECRET_KEY is not set in production environment!');
            } else {
                console.warn('Warning: SESSION_SECRET_KEY is not set. Using a default key for development. Set SESSION_SECRET_KEY for security in production.');
                return 'default_development_key';
            }
        }
        return key;
    }

    private configureMiddleware() {
        this.app.use(cors({ credentials: true }));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cookieSession({
            name: 'session',
            keys: [this.secretKey],
            maxAge: 24 * 60 * 60 * 1000
        }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session()); 
    }
    

    private configureRoutes() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.app.use('/api', router);
    }
}

export default new App().app;
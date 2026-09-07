import process from "process";
import "dotenv/config";

function getRequiredEnv(text: string): string {
    const value = process.env[text];

    if (!value) {
        throw new Error(`Missing required environment variable: ${text}`);
    }

    return value;
}

export const env = {
    baseUrl: getRequiredEnv('BASE_URL'),
    userName: getRequiredEnv('TEST_USERNAME'),
    password: getRequiredEnv('TEST_PASSWORD')
};
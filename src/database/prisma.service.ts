import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect() {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] База данных подключена');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[PrismaService] Не удалось подключиться к базе данных: ${e.message}`);
			}
		}
	}

	async disconnect() {
		await this.client.$disconnect();
	}
}

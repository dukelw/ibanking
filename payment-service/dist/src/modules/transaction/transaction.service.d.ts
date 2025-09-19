import { PrismaService } from 'prisma/prisma.service';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(amount: number, status: string): Promise<{
        amount: number;
        status: string;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        amount: number;
        status: string;
        createdAt: Date;
        id: number;
    }[]>;
}

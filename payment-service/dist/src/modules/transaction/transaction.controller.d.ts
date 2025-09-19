import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(body: {
        amount: number;
        status: string;
    }): Promise<{
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

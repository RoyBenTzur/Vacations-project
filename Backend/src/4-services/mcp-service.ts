import { dal } from "../2-utils/dal";
import McpResponse from "../3-models/mcp-response";
import { VacationModel } from "../3-models/vacations-model";

// Service for handling MCP questions.
class McpService {

    // Process user question and return answer from database.
    public async askQuestion(question: string): Promise<McpResponse> {

        // Normalize question for matching:
        const normalizedQuestion = question.trim().toLowerCase();

        // Handle active vacations count:
        if (this.isActiveVacationsQuestion(normalizedQuestion)) {
            return await this.getActiveVacationsCount();
        }

        // Handle total vacations count:
        if (this.isTotalVacationsQuestion(normalizedQuestion)) {
            return await this.getTotalVacationsCount();
        }

        // Handle future vacations list:
        if (this.isFutureVacationsQuestion(normalizedQuestion)) {
            return await this.getFutureVacations();
        }

        // Handle price questions:
        if (this.isPriceQuestion(normalizedQuestion)) {
            return await this.getPriceAnswer(normalizedQuestion);
        }

        // Handle popular vacation question:
        if (this.isPopularVacationQuestion(normalizedQuestion)) {
            return await this.getMostPopularVacation();
        }

        // Default response:
        return new McpResponse("Sorry, I can answer questions about vacations only.");
    }

    // Check if user asks about total vacations count.
    private isTotalVacationsQuestion(question: string): boolean {
        return question.includes("how many") && question.includes("vacation");
    }

    // Check if user asks about active vacations.
    private isActiveVacationsQuestion(question: string): boolean {
        return question.includes("active") && question.includes("vacation");
    }

    // Check if user asks about future vacations.
    private isFutureVacationsQuestion(question: string): boolean {
        return question.includes("future") && question.includes("vacation");
    }

    // Check if user asks about prices.
    private isPriceQuestion(question: string): boolean {
        return question.includes("price") || question.includes("cost") || question.includes("cheap") || question.includes("expensive");
    }

    // Check if user asks about popular vacations.
    private isPopularVacationQuestion(question: string): boolean {
        return question.includes("popular") || question.includes("most liked") || question.includes("top liked");
    }

    // Get total vacations count from database.
    private async getTotalVacationsCount(): Promise<McpResponse> {

        const sql = "select count(*) as count from vacations";
        const result = await dal.execute(sql) as any[];
        const count = result[0].count;

        return new McpResponse(`There are ${count} vacations in the system.`);
    }

    // Get active vacations count from database.
    private async getActiveVacationsCount(): Promise<McpResponse> {

        const sql = `
            select count(*) as count
            from vacations
            where start_date <= curdate()
            and end_date >= curdate()
        `;

        const result = await dal.execute(sql) as any[];
        const count = result[0].count;

        return new McpResponse(`There are ${count} active vacations.`);
    }

    // Get future vacations from database.
    private async getFutureVacations(): Promise<McpResponse> {

        const sql = `
            select destination
            from vacations
            where start_date > curdate()
            order by start_date asc
        `;

        const vacations = await dal.execute(sql) as VacationModel[];
        if (vacations.length === 0) {
            return new McpResponse("There are no future vacations.");
        }

        const destinations = vacations.map(v => v.destination).join(", ");
        return new McpResponse(`Future vacations: ${destinations}.`);
    }

    // Get answer for price-related questions.
    private async getPriceAnswer(question: string): Promise<McpResponse> {

        // Handle average price question:
        if (question.includes("average")) {
            return await this.getAverageVacationsPrice();
        }

        // Handle maximum price question:
        if (question.includes("highest") || question.includes("max") || question.includes("most expensive")) {
            return await this.getMostExpensiveVacation();
        }

        // Handle minimum price question:
        if (question.includes("lowest") || question.includes("min") || question.includes("cheapest")) {
            return await this.getCheapestVacation();
        }

        return new McpResponse("Sorry, I can answer average, cheapest, or most expensive vacation price questions only.");
    }

    // Get average vacations price from database.
    private async getAverageVacationsPrice(): Promise<McpResponse> {

        const sql = "select avg(price) as averagePrice from vacations";
        const result = await dal.execute(sql) as any[];
        const averagePrice = Number(result[0].averagePrice).toFixed(2);

        return new McpResponse(`The average vacation price is ${averagePrice}.`);
    }

    // Get most expensive vacation from database.
    private async getMostExpensiveVacation(): Promise<McpResponse> {

        const sql = `
            select destination, price
            from vacations
            order by price desc
            limit 1
        `;

        const vacations = await dal.execute(sql) as VacationModel[];
        if (vacations.length === 0) {
            return new McpResponse("There are no vacations in the system.");
        }

        const vacation = vacations[0];
        return new McpResponse(`The most expensive vacation is ${vacation.destination} with a price of ${vacation.price}.`);
    }

    // Get cheapest vacation from database.
    private async getCheapestVacation(): Promise<McpResponse> {

        const sql = `
            select destination, price
            from vacations
            order by price asc
            limit 1
        `;

        const vacations = await dal.execute(sql) as VacationModel[];
        if (vacations.length === 0) {
            return new McpResponse("There are no vacations in the system.");
        }

        const vacation = vacations[0];
        return new McpResponse(`The cheapest vacation is ${vacation.destination} with a price of ${vacation.price}.`);
    }

    // Get most popular vacation from database.
    private async getMostPopularVacation(): Promise<McpResponse> {

        const sql = `
            select v.destination, count(l.user_id) as likesCount
            from vacations v
            left join likes l
            on v.id = l.vacation_id
            group by v.id, v.destination
            order by likesCount desc
            limit 1
        `;

        const result = await dal.execute(sql) as any[];

        if (result.length === 0) {
            return new McpResponse("There are no vacations in the system.");
        }

        const vacation = result[0];
        return new McpResponse(`The most popular vacation is ${vacation.destination} with ${vacation.likesCount} likes.`);
    }

}

export const mcpService = new McpService();
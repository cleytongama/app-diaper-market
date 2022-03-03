import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

export default class DatabaseConnectionAdapter implements DatabaseConnection {
    pgp: any;

    constructor() {
        this.pgp = pgp()("postgres://postgres:cgama123@localhost:5432/db_diapers");
    }

    query(statement: string, params: any) {
        return this.pgp.query(statement, params);
    }

    connect() {
        return this.pgp.connect()
    }
}
export default interface DatabaseConnection {
    query(statement: string, params: any): any;
    connect?(statement: string, params: any): any;
}
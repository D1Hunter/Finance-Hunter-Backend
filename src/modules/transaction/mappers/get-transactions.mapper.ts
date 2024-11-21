class GetTransactionsMapper {
    fromControllerToService(limit: number, offset: number) {
        return {
            limit: limit > 0 ? limit : 1000,
            offset: offset >= 0 ? offset : 0
        }
    }
}

export const getTransactionsMapper = new GetTransactionsMapper();
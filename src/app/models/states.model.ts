import { CandidateResult } from "./candidate.model";

export interface StatesResult {
    name: string,
    id: string,
    totals: number,
    percentage: number,
    results: CandidateResult[],
    dependency: string[],
    dependencyNames: string[]
}
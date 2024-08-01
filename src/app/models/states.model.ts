import { CandidateResult } from "./candidate.model";

export interface StatesResult {
    name: string,
    totals: number,
    percentage: number,
    results: CandidateResult[]
}
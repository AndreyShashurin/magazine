import { Observable } from 'rxjs';
export class NodeStructureInterface {
    id?: string
    source?: string;
    name?: string;
    level: number;
    criteriaKey?: string[];
    departmens?: boolean;
    children?: NodeStructureInterface[];
}

export interface NodeInterface {
    id: string
    expandable: boolean;
    name: string;
    level: number;
    source: string;
    children?: NodeInterface[];
}

export interface PageRequest<T> {
    page: number;
    size: number;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    size: number;
    search?: {
        res: T[],
        field: string,
        length: number
    };
    pageSizeOptions: number[],
    number: number;
    length: number;
}

export interface QueryInterface {
  search: string;
}

export interface LimitInterface {
    limit: number;
    offset?: number;
}

export type PaginatedEndpoint<T, Q> = (pageable: PageRequest<T>, query: Q) => Observable<Page<T>>
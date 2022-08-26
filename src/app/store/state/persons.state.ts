import { personsInterface } from '../../shared/interface/interface.service';

export interface IPersonsState {
    persons: personsInterface[];
    selectedPersons: personsInterface;
}

export const initialPersonsState: IPersonsState = {
    persons: null,
    selectedPersons: null
}
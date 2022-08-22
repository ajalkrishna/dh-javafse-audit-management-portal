// {id: 4, question: 'Is the SIT and UAT sign-off available?', type: 'Internal', status: 'NO'}
export interface Question{
    id:number;
    question:string;
    type:string;
    status?:string
}
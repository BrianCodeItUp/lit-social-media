

interface Error {
  field: string;
  messages: string[];
}

export interface MyContext {
  error: Error[] | null
}
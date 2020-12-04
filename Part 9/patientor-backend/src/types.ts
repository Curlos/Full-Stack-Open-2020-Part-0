export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;
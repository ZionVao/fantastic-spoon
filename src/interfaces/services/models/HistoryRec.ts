import { DocRecord } from './Record';

export interface HistoryRec {
  edit: Partial<DocRecord>;
  time: string;
  user: {
    name: string;
    id: number;
  };
}

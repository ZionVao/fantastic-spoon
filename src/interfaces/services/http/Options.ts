import { ContentType } from 'src/common/enums/content-type.enum';
import { HttpMethod } from 'src/common/enums/http-method.enum';
import { Query } from './Query';

export class Options {
  method?: HttpMethod;
  contentType?: ContentType;
  hasAuth?: boolean;
  payload?: string;
  query?: Query;
  form?: FormData;
}

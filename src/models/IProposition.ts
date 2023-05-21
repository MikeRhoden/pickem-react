import { IPick } from './IPick';
import { IMatchup } from './IMatchup';
import { IInfo } from './IInfo';
import { IGroup } from './IGroup';

export interface IProposition {
  key: string;
  matchup: IMatchup;
  pick: IPick;
  info: IInfo;
  group: IGroup;
  isTooLate: boolean;
  originalPick: IPick;
}

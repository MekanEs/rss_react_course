import { IPerson } from '../../API/apiTypes';

export interface DetailedWindowProps {
  person: IPerson;
  handleClose: () => void;
}

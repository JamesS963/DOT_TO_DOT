/**
 * Created by davem on 28/01/2018.
 */
export interface Project {

  description: string;
  icon: string;
  id: string;
  image: string;
  lat: number;
  lng: number;
  members?: Member[];
  messages?: Message[];
  name: string;
  owner?: string;
  summary: string;
  type: string;
  itemsWanted: any;

}

export class Member {
  // key:string;
  id: string;
}

export class Message {
  //key: string;
  displayName: string;
  email: string;
  message: string;
  timestamp: number;

}

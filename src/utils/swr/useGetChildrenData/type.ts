export type ChildType = {
  checkedIn: boolean;
  childId: string;
  name: {
    firstName: string;
    fullName: string;
    lastName: string;
    middleName?: string;
  };
  image: {
    small: string;
  };
};

export type ChildrenDataType = ChildType[];

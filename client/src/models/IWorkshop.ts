export interface IWorkshop {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    date: string;
    instructor: string;
    duration: string;
    location: string;
    language: string;
    isAvailable: boolean;
    plannedDay: string;
    maxParticipants: number;
    availableSpots: number;
    quantity?: number;
    img: IWorkshopImage;
    selectedDate: string[];
  };
}
export const initialWorkshop: IWorkshop = {
  id: 0,
  attributes: {
    title: '',
    description: '',
    price: 0,
    date: '',
    instructor: '',
    duration: '',
    location: '',
    language: '',
    isAvailable: true,
    plannedDay: '',
    maxParticipants: 0,
    availableSpots: 0,
    quantity: 0,
    img: { data: { attributes: { alternativeText: '', url: '' } } },
    selectedDate: [],
  },
};

export interface IWorkshopImage {
  data: {
    attributes: {
      alternativeText: string;
      url: string;
    };
  };
}

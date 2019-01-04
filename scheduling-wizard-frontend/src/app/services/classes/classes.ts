declare type dayInfo = {
    start: string,
    end: string,
    location: string
}

declare type day = {
    monday?: dayInfo,
    tuesday?: dayInfo,
    wednesday?: dayInfo,
    thursday?: dayInfo,
    friday?: dayInfo
}


export class Classes {
    _id: string;
    department: string;
    course: string;
    section: string;
    sectionType: string;
    courseName: string;
    instructor: string;
    hours: number;
    days: string;
    start: string;
    end: string;
    location: string;
    seatsAvailable: string;
    waitList: string;
    classes: day;
}

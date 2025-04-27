// src/lib/mocks.ts
import {
  ClassSchedule,
  Member,
  Membership,
  Service,
  Room,
  Equipment,
  MemberCharge,
  Workout,
  Measurement,
  Club,
  Promotion,
  Product,
  Questionnaire,
  Agreement,
} from "@/types/gymmaster";

export const mockClasses: ClassSchedule[] = [
  {
    id: 1,
    name: "Yoga Flow",
    classid: 101,
    arrival: "2025-05-01",
    dayofweek: "Thursday",
    starttime: "08:00:00",
    endtime: "09:00:00",
    availability: "available",
    resourceid: 1,
    location: "Studio A",
    staffid: "s1",
    staffname: "Jane Doe",
    staffphoto: "https://example.com/jane.jpg",
    description: "A calming yoga session.",
    companyid: 1,
    companyname: "FitClub",
    max_students: 20,
    spacesfree: 10,
    bgcolour: "#FF5733",
    image: "https://example.com/yoga.jpg",
    online_instruction: "Bring your own mat.",
  },
];

export const mockMember: Member = {
  id: 1,
  firstname: "John",
  surname: "Smith",
  email: "john.smith@example.com",
  dob: "1990-01-01",
  gender: "M",
  phonecell: "1234567890",
  phonehome: "0987654321",
  addressstreet: "123 Main St",
  addresssuburb: "Downtown",
  addresscity: "FitCity",
  addresscountry: "USA",
  addressareacode: "12345",
  receivesms: "yes",
  receiveemail: "yes",
  goal: "Build muscle",
  joindate: "2024-01-01",
  sourcepromotion: "Friend referral",
  memberphoto: "https://example.com/john.jpg",
  totalvisits: 50,
  totalpts: 10,
  totalclasses: 20,
  linked_members: [],
};

export const mockMemberships: Membership[] = [
  {
    id: 1,
    name: "Premium Membership",
    description: "Full access to all classes and facilities.",
    price: "$99.99",
    price_tax: "$9.99",
    pricedescription: "Monthly billing",
    signupfee: "$50.00",
    signupfee_tax: "$5.00",
    signupfee_label: "One-time fee",
    onlinecash: true,
    programme_ref: "premium_2025",
    programmegroupid: "pg1",
    startdate: "2025-01-01",
    divisionid: 1,
    divisionname: "General",
    bgcolour: "#1E90FF",
    hide_signupfee: false,
    maintenance_fee: null,
    maintenance_interval: null,
    promotional_period: "1 month",
    promotional_price: "$79.99",
    promotion_period_description: "First month discount",
    freeuntil: "2025-02-01",
    freeuntil_available: true,
    promotion_freeuntil_description: "Free trial until Feb 2025",
    show_pricedescription: true,
    account_credit: "$10.00",
    zero_signupfee: false,
    discountdescription: "Referral discount applied",
    sortorder: 1,
    companyids: [1],
  },
];

export const mockServices: Service[] = [
  {
    serviceid: 1,
    membershipid: 1,
    benefitid: 101,
    servicename: "Personal Training",
    status: "Active",
    price: "$50.00",
  },
];

export const mockRooms: Room[] = [{ id: 1, name: "Training Room A" }];

export const mockEquipment: Equipment[] = [{ id: 1, name: "Treadmill" }];

export const mockCharges: MemberCharge[] = [
  {
    postingid: 1,
    occurred: "2025-04-01",
    note: "Monthly membership fee",
    total: "$99.99",
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: 1,
    name: "Strength Training",
    workdate: "2025-04-20",
    notes: "Focus on upper body",
    type: "weight",
    values: [
      {
        id: 1,
        name: "Bench Press",
        description: "Chest exercise",
        imagelink: "https://example.com/bench.jpg",
        videolink: "https://example.com/bench.mp4",
        intensity: "Moderate",
        duration: "00:10:00",
        reps: 12,
        rest: 1.5,
        sets: 3,
        tempo: "2-1-2",
        weight: 100,
      },
    ],
  },
];

export const mockMeasurements: Measurement[] = [
  {
    id: 1,
    latest: true,
    measured_on: "2025-04-15",
    photos: ["https://example.com/measurement1.jpg"],
    values: [
      {
        category: "Weight",
        measurementtypeid: 1,
        name: "Body Weight",
        value: 75,
        unit: "kg",
        unitgroup: "Weight",
      },
    ],
  },
];

export const mockClubs: Club[] = [
  { id: 1, name: "FitClub Downtown", billingprovider: "Stripe" },
];

export const mockPromotions: Promotion[] = [{ id: 1, name: "Summer Discount" }];

export const mockProducts: Product[] = [
  {
    productid: 1,
    name: "Protein Shake",
    producttype: "Supplement",
    price: "$5.00",
    image: "https://example.com/protein.jpg",
  },
];

export const mockQuestionnaires: Questionnaire[] = [
  {
    id: 1,
    name: "Fitness Assessment",
    questions: [
      {
        id: 1,
        label: "What is your fitness goal?",
        required: true,
        type: "text",
        textlength: 5,
        options: [],
        children: [],
      },
    ],
  },
];

export const mockAgreements: Agreement[] = [
  {
    id: 1,
    name: "Terms & Conditions",
    body: "<p>Standard gym terms.</p>",
    points: ["Agree to follow rules", "Pay on time"],
  },
];

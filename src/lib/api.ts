// src/lib/api.ts
import axios from "axios";
import {
  mockClasses,
  mockMember,
  mockMemberships,
  mockServices,
  mockRooms,
  mockEquipment,
  mockCharges,
  mockWorkouts,
  mockMeasurements,
  mockClubs,
  mockPromotions,
  mockProducts,
  mockQuestionnaires,
  mockAgreements,
} from "./mocks";
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

const API_BASE_URL = "https://api.gymmaster.com/portal/api";
const API_KEY = "mock-api-key";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

const protectedRequest = async <T>(
  request: () => Promise<T>,
  token: string | null
): Promise<T> => {
  if (!token) throw new Error("Authentication required");
  return request();
};

// Authentication
export const login = async (
  email: string,
  password: string
): Promise<{ token: string; expires: number; memberid: number }> => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ token: "mock-token", expires: 3600, memberid: 1 }),
      500
    );
  });
};

export const signup = async (data: {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  membershiptypeid: number;
}): Promise<{
  token: string;
  expires: number;
  memberid: string;
  membershipid: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          token: "mock-token",
          expires: 3600,
          memberid: "1",
          membershipid: "1",
        }),
      500
    );
  });
};

export const resetPassword = async (email: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Password reset email sent"), 500);
  });
};

// Class Schedule
export const getClassSchedule = async (
  week: string
): Promise<ClassSchedule[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClasses), 500);
  });
};

// Member Profile
export const getMemberProfile = async (token: string): Promise<Member> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMember), 500);
  });
};

// Memberships
export const getMemberships = async (token?: string): Promise<Membership[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMemberships), 500);
  });
};

export const cancelMembership = async (
  token: string,
  membershipid: number,
  enddate: string,
  reason: number
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Membership cancelled"), 500);
  });
};

export const suspendMembership = async (
  token: string,
  startdate: string,
  enddate: string,
  reason: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Membership suspended"), 500);
  });
};

export const getMembershipAgreement = async (
  token: string,
  membershiptypeid: number
): Promise<Agreement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAgreements), 500);
  });
};

// Services
export const getServices = async (token?: string): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockServices), 500);
  });
};

export const bookService = async (data: {
  token: string;
  resourceid: number;
  serviceid: number;
  benefitid: number;
  membershipid: number;
  day: string;
  bookingstart: string;
  bookingend: string;
}): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Service booked"), 500);
  });
};

export const getRooms = async (
  token: string,
  serviceid: number,
  day: string,
  bookingstart: string,
  bookingend: string
): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRooms), 500);
  });
};

export const getEquipment = async (
  token: string,
  serviceid: number,
  day: string,
  bookingstart: string,
  bookingend: string
): Promise<Equipment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEquipment), 500);
  });
};

// Charges
export const getOutstandingCharges = async (
  token: string
): Promise<MemberCharge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCharges), 500);
  });
};

export const payCharges = async (
  token: string,
  postingids: number[]
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Charges paid"), 500);
  });
};

export const logPayment = async (
  token: string,
  amount: string,
  note: string,
  paymentmethod_name: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Payment logged"), 500);
  });
};

// Workouts and Measurements
export const getWorkouts = async (token: string): Promise<Workout[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWorkouts), 500);
  });
};

export const getMeasurements = async (
  token: string
): Promise<Measurement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMeasurements), 500);
  });
};

export const addMeasurement = async (
  token: string,
  measured_on: string,
  measurements: any[]
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Measurement added"), 500);
  });
};

// Feedback and Communication
export const sendFeedback = async (
  email: string,
  message: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Feedback sent"), 500);
  });
};

export const uploadFile = async (
  token: string,
  file: File
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("File uploaded"), 500);
  });
};

// Additional Features
export const getClubs = async (): Promise<Club[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClubs), 500);
  });
};

export const getPromotions = async (): Promise<Promotion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPromotions), 500);
  });
};

export const purchaseProduct = async (
  token: string,
  products: { productid: number; quantity: number }[]
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Product purchased"), 500);
  });
};

export const getQuestionnaires = async (): Promise<Questionnaire[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockQuestionnaires), 500);
  });
};

// Fetch products (mocked GET /portal/api/v2/products)
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

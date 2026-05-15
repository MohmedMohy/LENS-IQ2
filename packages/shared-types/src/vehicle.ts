export type VehicleCondition =
  | "NEW"
  | "USED";

export type Vehicle = {
  id: number;

  brand: string;

  model: string;

  manufacturing_year: number;

  condition: VehicleCondition;

  price: number;

  mileage?: number;

  color?: string;

  created_at?: string;

  updated_at?: string;
};
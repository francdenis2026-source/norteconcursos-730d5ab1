import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCPF(cpf: string) {
  const digits = cpf.replace(/\D/g, "");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function maskCPF(cpf: string) {
  const formatted = formatCPF(cpf);
  return formatted.replace(/\d(?=\d{4})/g, "*");
}

export function validateCPF(cpf: string) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || !!digits.match(/(\d)\1{10}/)) return false;
  
  const values = digits.split("").map(Number);
  
  const calculate = (multiplier: number) => {
    let sum = 0;
    for (let i = 0; i < multiplier - 1; i++) {
      sum += values[i] * (multiplier - i);
    }
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  return calculate(10) === values[9] && calculate(11) === values[10];
}

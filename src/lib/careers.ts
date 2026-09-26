export interface CareerDef {
  id: string;
  name: string;
  fullName: string;
  agency: string;
  color: string; // tailwind-ish hex used inline
}

export const CAREERS: CareerDef[] = [
  { id: 'pf', name: 'PF', fullName: 'Polícia Federal', agency: 'Polícia Federal', color: '#1B4B6B' },
  { id: 'prf', name: 'PRF', fullName: 'Polícia Rodoviária Federal', agency: 'Polícia Rodoviária Federal', color: '#2F7A4F' },
  { id: 'depen', name: 'DEPEN', fullName: 'Departamento Penitenciário Nacional', agency: 'DEPEN', color: '#6B4A9E' },
  { id: 'pc', name: 'PC', fullName: 'Polícia Civil', agency: 'Polícia Civil', color: '#B4740E' },
  { id: 'pp', name: 'PP', fullName: 'Polícia Penal', agency: 'Polícia Penal', color: '#7A3B2E' },
  { id: 'bombeiro', name: 'Bombeiro', fullName: 'Corpo de Bombeiros Militar', agency: 'Corpo de Bombeiros', color: '#B23A3A' },
  { id: 'pm', name: 'PM', fullName: 'Polícia Militar', agency: 'Polícia Militar', color: '#1B6B4B' },
];

export function careerById(id: string): CareerDef | undefined {
  return CAREERS.find(c => c.id === id);
}

export function careerByAgency(agency?: string | null): CareerDef | undefined {
  if (!agency) return undefined;
  return CAREERS.find(c => agency.toLowerCase().includes(c.agency.toLowerCase().split(' ')[0].toLowerCase()));
}

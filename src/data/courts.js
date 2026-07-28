// Mock court data — replace with API calls when backend is ready

export const courts = [
  { id: 1, name: 'Court 1', status: 'available', floor: 'Wooden', lighting: 'LED', nextSlot: '2:00 PM', schedule: ['10:00–11:00 (Booked)', '11:00–12:00 (Available)', '12:00–1:00 (Available)', '2:00–3:00 (Available)', '3:00–4:00 (Booked)'] },
  { id: 2, name: 'Court 2', status: 'booked', floor: 'Wooden', lighting: 'LED', nextSlot: '3:30 PM', schedule: ['10:00–11:00 (Booked)', '11:00–12:00 (Booked)', '12:00–1:00 (Booked)', '2:00–3:00 (Available)', '3:30–4:30 (Available)'] },
  { id: 3, name: 'Court 3', status: 'available', floor: 'Synthetic', lighting: 'LED', nextSlot: '11:00 AM', schedule: ['11:00–12:00 (Available)', '12:00–1:00 (Booked)', '2:00–3:00 (Available)', '3:00–4:00 (Available)'] },
  { id: 4, name: 'Court 4', status: 'maintenance', floor: 'Wooden', lighting: 'LED', nextSlot: 'Tomorrow', schedule: [] },
  { id: 5, name: 'Court 5', status: 'available', floor: 'Wooden', lighting: 'LED', nextSlot: '1:00 PM', schedule: ['1:00–2:00 (Available)', '2:00–3:00 (Booked)', '3:00–4:00 (Available)'] },
  { id: 6, name: 'Court 6', status: 'booked', floor: 'Synthetic', lighting: 'LED', nextSlot: '4:00 PM', schedule: ['10:00–11:00 (Booked)', '11:00–12:00 (Booked)', '4:00–5:00 (Available)'] },
  { id: 7, name: 'Court 7', status: 'available', floor: 'Wooden', lighting: 'LED', nextSlot: '12:00 PM', schedule: ['12:00–1:00 (Available)', '2:00–3:00 (Available)', '3:00–4:00 (Booked)'] },
  { id: 8, name: 'Court 8', status: 'available', floor: 'Wooden', lighting: 'LED', nextSlot: '2:00 PM', schedule: ['2:00–3:00 (Available)', '3:00–4:00 (Available)', '4:00–5:00 (Booked)'] },
  { id: 9, name: 'Court 9', status: 'booked', floor: 'Synthetic', lighting: 'LED', nextSlot: '5:00 PM', schedule: ['10:00–2:00 (Booked)', '5:00–6:00 (Available)'] },
  { id: 10, name: 'Court 10', status: 'available', floor: 'Wooden', lighting: 'LED', nextSlot: '11:30 AM', schedule: ['11:30–12:30 (Available)', '1:00–2:00 (Booked)', '3:00–4:00 (Available)'] },
  { id: 11, name: 'Court 11', status: 'available', floor: 'Wooden', lighting: 'LED', nextSlot: '10:00 AM', schedule: ['10:00–11:00 (Available)', '11:00–12:00 (Available)', '2:00–3:00 (Booked)'] },
]

export const availableCount = courts.filter(c => c.status === 'available').length

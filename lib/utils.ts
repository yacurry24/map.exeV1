import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getProductTypeIcon(type: string) {
  return type === 'map' ? 'map' : 'code';
}

export function getProductTypeColor(type: string) {
  return type === 'map' ? 'purple' : 'blue';
}

export function getStarRating(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: Array(fullStars).fill('star'),
    half: hasHalfStar ? ['star-half'] : [],
    empty: Array(emptyStars).fill('star-outline')
  };
}

export function getOrderStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
}

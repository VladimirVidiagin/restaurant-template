import axios from 'axios'
import { getTelegramInitData } from '@shared/lib/telegram'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export interface OrderItem {
	slug: string
	title: string
	price: number
	quantity: number
}

export interface OrderRequest {
	items: OrderItem[]
	total: number
	telegram_init_data: string
}

export interface OrderResponse {
	success: boolean
	order_id: string
}

export const createOrder = async (
	items: OrderItem[],
	total: number
): Promise<OrderResponse> => {
	const telegramInitData = getTelegramInitData()

	const orderData: OrderRequest = {
		items,
		total,
		telegram_init_data: telegramInitData,
	}

	const response = await axios.post<OrderResponse>(`${API_BASE_URL}/api/orders`, orderData)

	return response.data
}
